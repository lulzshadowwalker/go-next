import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import s from '../styles/home.module.css';
import PrimaryButton from '@/components/primary-button';
import SecondaryButton from '@/components/secondary-button';
import BaseInput from '@/components/base-input';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={s.container}>
      <PrimaryButton>Primary Button</PrimaryButton>
      <SecondaryButton>Secondary Button</SecondaryButton>
      <BaseInput type="text" placeholder="hello" />
    </div>
  );
}
