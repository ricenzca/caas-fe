'use client'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import('./LeafletMap'), { ssr: false })

export default DynamicMap;