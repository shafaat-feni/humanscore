import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { TestDirectory } from './pages/TestDirectory'
import { CategoryPage } from './pages/CategoryPage'
import { AssessmentDetailPlaceholder } from './pages/AssessmentDetailPlaceholder'
import { NotFound } from './pages/NotFound'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { Disclaimer } from './pages/Disclaimer'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests" element={<TestDirectory />} />
        <Route path="/tests/:slug" element={<AssessmentDetailPlaceholder />} />

        {/* Pages not built yet: temporarily show the Not Found page */}
        <Route path="/overall-assessment" element={<NotFound />} />
        <Route path="/scoring-methodology" element={<NotFound />} />
        <Route path="/about" element={<NotFound />} />
        <Route path="/contact" element={<NotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />

        {/* Category pages: /physical, /cognitive, /psychological, /lifestyle, /skills */}
        <Route path="/:categoryName" element={<CategoryPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App