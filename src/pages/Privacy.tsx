
import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>When you use EasyBill Studio, we collect and process the following information:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Basic account information (email address)</li>
            <li>Invoice data you input into our system</li>
            <li>Usage information and analytics</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Providing our invoice generation service</li>
            <li>Improving our platform</li>
            <li>Communicating with you about our services</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@easybillstudio.com</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
