"use client";
import { usePathname, useRouter } from '@/i18n/navigation';
import React from 'react'
import { useLocale } from 'use-intl';

const SwitcherComponent = () => {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale) => {
        if (newLocale !== locale) {
            router.replace(pathname, {locale: newLocale});
            router.refresh();
        }
    }

  return (
    <select value={locale} onChange={e => switchLocale(e.target.value)}>
        <option value={"en"}>EN</option>
        <option value={"id"}>ID</option>
        <option value={"zh"}>ZH</option>
    </select>
  )
}

export default SwitcherComponent;