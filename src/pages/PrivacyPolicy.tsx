import React from 'react';
import { LegalPage } from './LegalPage';

export const PrivacyPolicy: React.FC = () => (
  <LegalPage
    title="Privacy Policy"
    lastUpdated="October 18, 2026"
    intro="HumanScore is designed so that your assessment responses stay on your device."
    sections={[
      {
        heading: 'What we store',
        paragraphs: [
          'When you complete an assessment, the result is saved in your browser\'s localStorage on your own device. We do not require registration or an account, and we do not send your assessment responses or results to a server.',
        ],
      },
      {
        heading: 'Your control',
        paragraphs: [
          'Because results live in your browser, you can remove them at any time by clearing this site\'s data in your browser settings. Results are not synced between devices or browsers, and clearing your browser data permanently deletes them.',
        ],
      },
      {
        heading: 'Hosting and technical logs',
        paragraphs: [
          'Like most websites, the service that hosts HumanScore may record standard technical information such as IP address, browser type, and requested pages in its server logs. This information is not linked to your assessment results.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'If we add features that change how data is handled, such as analytics or accounts, we will update this page before they take effect.',
        ],
      },
    ]}
  />
);
