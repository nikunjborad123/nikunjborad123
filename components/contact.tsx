'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import SectionHeading from './section-heading';
import SubmitBtn from './SubmitBtn';
import toast from 'react-hot-toast';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const { ref } = useSectionInView('Contact');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      // Add the form data to Firestore
      await addDoc(collection(db, 'contacts'), formData);
      await fetch('api/mailService', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({ // Convert data to JSON string
          name: formData.name,
          email: formData.email
        }),
      });
  
      // Reset form data after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
  
      // Show success toast
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      // Show error toast
      toast.error('Failed to send message. Please try again later.');
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>Contact me</SectionHeading>

      <p className="text-gray-700 -mt-6 dark:text-white/80">
        Please contact me directly at{' '}
        <a className="underline" href="mailto:boradnikunj2001@gmail.com">
          boradnikunj2001@gmail.com
        </a>{' '}
        or through this form.
      </p>

      <form
        className="mt-10 flex flex-col dark:text-black"
        onSubmit={handleFormSubmit}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none mb-3"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
        />
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none mb-3"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your email"
        />
        <textarea
          className="h-52 mb-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Your message"
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </motion.section>
  );
}
