import SwitcherComponent from '@/components/Switcher'
import CaseStudiesExample from '@/components/CaseStudiesExample';

export default function Home() {
  return (
    <div>
      <p>This is a multilingual Next.js site using next-intl.</p>
      <SwitcherComponent />
      <CaseStudiesExample />
    </div>
  );
}