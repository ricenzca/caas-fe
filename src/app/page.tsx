import { getFlightPlans } from "@/server-apis/flightPlans";
import Cards from "@/components/Cards";
import SearchFilter from "@/components/SearchFilter";

export default async function Home() {
  const flightPlans = await getFlightPlans()

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-between">
        <SearchFilter>
          {flightPlans instanceof Error ?
            <p>{flightPlans.message}</p>
            : <Cards flightPlans={flightPlans} />}
        </SearchFilter>
      </main >
    </div >
  )
}