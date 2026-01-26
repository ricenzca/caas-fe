// Make sure you have a jest.setup.js file that includes:
// import '@testing-library/jest-dom';
// to use matchers like .toBeInTheDocument()

import { render, screen } from '@testing-library/react';
import { FlightPlan } from '@/types/flightPlan';
import { jest, describe, it, expect, beforeAll, beforeEach } from '@jest/globals';
import type { getFlightPlans } from '@/server-apis/flightPlans';

// Mock the server API. The path should match how it's imported in page.tsx.
jest.unstable_mockModule('@/server-apis/flightPlans', () => ({
    getFlightPlans: jest.fn(),
}));

// Mock child components to keep the test focused on the Home component.
// When using ES modules, you need to return an object with __esModule: true for default exports.
jest.unstable_mockModule('@/components/Cards', () => {
    // When using ES6 modules with jest.mock, you need to return an object with __esModule: true.
    return {
        __esModule: true,
        default: ({ flightPlans }: { flightPlans: FlightPlan[] }) => (
            <div data-testid="cards-mock">
                {flightPlans.map((fp) => (
                    <div key={fp.id}>{fp.callSign}</div>
                ))}
            </div>
        ),
    };
});

jest.unstable_mockModule('@/components/SearchFilter', () => {
    return {
        __esModule: true,
        default: ({ children }: { children: React.ReactNode }) => <div data-testid="search-filter-mock">{children}</div>,
    };
});

describe('Home Page', () => {
    let HomeActual: typeof import('@/app/page').default;
    let mockedGetFlightPlans: jest.MockedFunction<typeof getFlightPlans>;

    beforeAll(async () => {
        // Dynamically import modules after mocks are set up.
        // This ensures that 'Home' gets the mocked version of 'getFlightPlans'.
        const { getFlightPlans } = await import('@/server-apis/flightPlans');
        mockedGetFlightPlans = jest.mocked(getFlightPlans);

        const homeModule = await import('@/app/page');
        HomeActual = homeModule.default;
    });

    // Clear mocks before each test to ensure a clean state
    beforeEach(() => {
        mockedGetFlightPlans.mockClear();
    });

    it('should render flight plans when data fetching is successful', async () => {
        const mockFlightPlans: FlightPlan[] = [
            { id: '1', callSign: 'Flight Plan 1', departure: 'dep1', arrival: 'arr1' },
            { id: '2', callSign: 'Flight Plan 2', departure: 'dep2', arrival: 'arr2' },
        ];
        mockedGetFlightPlans.mockResolvedValue(mockFlightPlans);

        const Page = await HomeActual();
        render(Page);

        expect(screen.getByTestId('cards-mock')).toBeInTheDocument();
        expect(screen.getByText('Flight Plan 1')).toBeInTheDocument();
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
        expect(screen.getByTestId('search-filter-mock')).toBeInTheDocument();
    });

    it('should render an error message when data fetching fails', async () => {
        const errorMessage = 'Failed to fetch flight plans';
        mockedGetFlightPlans.mockResolvedValue(new Error(errorMessage));

        const Page = await HomeActual();
        render(Page);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(screen.queryByTestId('cards-mock')).not.toBeInTheDocument();
        expect(screen.getByTestId('search-filter-mock')).toBeInTheDocument();
    });
});