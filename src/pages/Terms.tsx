
import React from 'react';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <div className="prose prose-slate max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using EasyBill Studio, you agree to be bound by these Terms of Service.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p>EasyBill Studio provides online invoice generation services. We reserve the right to modify or discontinue the service at any time.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You are responsible for maintaining the confidentiality of your account</li>
            <li>You agree to provide accurate information</li>
            <li>You will not use the service for any illegal purposes</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">4. Limitations of Liability</h2>
          <p>EasyBill Studio is provided "as is" without any warranties, express or implied.</p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
