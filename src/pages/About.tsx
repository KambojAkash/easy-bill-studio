
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About EasyBill Studio</h1>
      <div className="prose prose-slate max-w-none">
        <section className="mb-6">
          <p className="mb-4">
            EasyBill Studio is a professional invoice generation platform designed to help businesses create, manage, and send professional invoices efficiently.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            We strive to simplify the invoicing process for businesses of all sizes, providing professional and customizable invoice templates that help maintain a professional image.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p>Email: contact@easybillstudio.com</p>
          <p>Address: 123 Business Street, Suite 100, San Francisco, CA 94105</p>
        </section>
      </div>
    </div>
  );
};

export default About;
