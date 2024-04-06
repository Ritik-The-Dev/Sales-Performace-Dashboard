import AreaBarChart from "./AreaBarChart"
import AreaProgressChart from "./AreaProgressChart"

const AreaCharts = () => {
  return (
<section className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4 md:grid-cols-1">
  <AreaBarChart />
  <AreaProgressChart />
</section>

  )
}

export default AreaCharts
