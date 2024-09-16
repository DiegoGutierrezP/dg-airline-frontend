import { FlightFilterParams } from "@/types/dtos";
import { Hero } from "./components";
import { FlightsCatalog } from "./components/flights-catalog";

export default function Home({
  searchParams,
}: {
  searchParams?: Partial<FlightFilterParams>
}) {

  return <div className="static w-full ">
    <Hero />
    <br />
    <FlightsCatalog
      origin={searchParams?.origin}
      destination={searchParams?.destination}
      date={searchParams?.date}
    />
  </div>
}
