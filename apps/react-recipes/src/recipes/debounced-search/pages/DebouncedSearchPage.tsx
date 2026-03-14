import RecipePageLayout from '../../RecipePageLayout'
import Baseline from '../components/Baseline'
import Explanation from '../components/Explanation'
import ImprovedImplementation from '../components/ImprovedImplementation'
import Problem from '../components/Problem'

export default function DebouncedSearchPage() {
  return (
    <RecipePageLayout
      title="Debounced Search"
      description="This recipe demonstrates how to delay API calls while typing and avoid unnecessary requests during fast user input."
    >
      <Problem />
      <Baseline />
      <Explanation />
      <ImprovedImplementation />
    </RecipePageLayout>
  )
}
