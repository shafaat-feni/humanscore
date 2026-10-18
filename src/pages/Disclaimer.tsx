import React from 'react';
import { LegalPage } from './LegalPage';

export const Disclaimer: React.FC = () => (
  <LegalPage
    title="Medical Disclaimer"
    lastUpdated="October 18, 2026"
    intro="HumanScore is an educational and informational self-assessment platform. It is not a medical, psychological, or diagnostic service."
    sections={[
      {
        heading: 'Not medical advice',
        paragraphs: [
          'Results from assessments such as BMI, waist-to-height ratio, endurance, stress, and well-being tests are general indicators only. They do not account for your full health history and must not be used to diagnose, treat, or rule out any condition.',
        ],
      },
      {
        heading: 'Talk to a professional',
        paragraphs: [
          'Consult a qualified healthcare professional before making decisions about your health, exercise, nutrition, or mental well-being. Do not delay or disregard professional advice because of something you read or scored on this site.',
        ],
      },
      {
        heading: 'Cognitive and personality assessments',
        paragraphs: [
          'Cognitive, knowledge, and personality assessments are for self-reflection and entertainment. They are not validated clinical instruments and do not measure intelligence or personality in a clinical sense.',
        ],
      },
      {
        heading: 'In an emergency',
        paragraphs: [
          'If you think you may be experiencing a medical or mental health emergency, contact your local emergency services immediately.',
        ],
      },
    ]}
  />
);
