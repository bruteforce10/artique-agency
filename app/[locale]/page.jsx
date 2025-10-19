import { useTranslations } from 'next-intl';
import { use } from 'react';
import { setRequestLocale } from "next-intl/server";
import SwitcherComponent from '@/components/Switcher'
import CaseStudiesExample from '@/components/CaseStudiesExample';

export default function Home({params }) {
const {locale} = use(params);

  setRequestLocale(locale);
  const t = useTranslations('home');


  return (
    <div>
      <h1>{t('header')}</h1>
      <p>This is a multilingual Next.js site using next-intl.</p>
      <SwitcherComponent />
      <CaseStudiesExample />
    </div>
  );
}