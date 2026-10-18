import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { TestDirectory } from './pages/TestDirectory'
import { CategoryPage } from './pages/CategoryPage'
import { AssessmentDetailPlaceholder } from './pages/AssessmentDetailPlaceholder'
import { NotFound } from './pages/NotFound'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Disclaimer } from './pages/Disclaimer'
import { About } from './pages/About'
import { ScoringMethodology } from './pages/ScoringMethodology'
import { Contact } from './pages/Contact'
import { FAQ } from './pages/FAQ'
import { GeneralKnowledgeView } from './components/assessments/GeneralKnowledgeView';
import { OverallDashboardView } from './components/dashboard/OverallDashboardView';
import { PersonalityReflectionView } from './components/assessments/PersonalityReflectionView';
import { StressWellbeingView } from './components/assessments/StressWellbeingView';
import { DailyHabitsView } from './components/assessments/DailyHabitsView';
import { NumberPatternView } from './components/assessments/NumberPatternView';
import { NumericalReasoningView } from './components/assessments/NumericalReasoningView';
import { MemoryChallengeView } from './components/assessments/MemoryChallengeView';
import { BmiCalculatorView } from './components/assessments/BmiCalculatorView';
import { WthCalculatorView } from './components/assessments/WthCalculatorView';
import { PlankTestView } from './components/assessments/PlankTestView';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests" element={<TestDirectory />} />
        <Route path="/tests/:slug" element={<AssessmentDetailPlaceholder />} />
        <Route path="/about" element={<About />} />
        <Route path="/scoring-methodology" element={<ScoringMethodology />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tests/general-knowledge-challenge" element={<GeneralKnowledgeView />} />
        <Route path="/overall-assessment" element={<OverallDashboardView />} />
        <Route path="/tests/personality-self-reflection" element={<PersonalityReflectionView />} />
        <Route path="/tests/stress-and-wellbeing" element={<StressWellbeingView />} />
        <Route path="/tests/daily-habits-assessment" element={<DailyHabitsView />} />
        <Route path="/tests/number-pattern-challenge" element={<NumberPatternView />} />
        <Route path="/tests/numerical-reasoning" element={<NumericalReasoningView />} />
        <Route path="/tests/short-term-memory-challenge" element={<MemoryChallengeView />} />
        <Route path="/tests/bmi-calculator" element={<BmiCalculatorView />} />
        <Route path="/tests/waist-to-height-ratio" element={<WthCalculatorView />} />
        <Route path="/tests/plank-endurance-test" element={<PlankTestView />} />

        {/* Category pages: /physical, /cognitive, /psychological, /lifestyle, /skills */}
        <Route path="/:categoryName" element={<CategoryPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
export default App