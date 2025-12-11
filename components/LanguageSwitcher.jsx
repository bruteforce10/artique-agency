"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "use-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";

const languages = [
  {
    value: "en",
    label: "EN",
    flag: "/flag-eng.webp",
  },
  {
    value: "id",
    label: "ID",
    flag: "/flag-ind.webp",
  },
];

export default function LanguageSwitcher({
  className,
  isDesktop,
  navbarColor,
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  };

  const currentLanguage =
    languages.find((lang) => lang.value === locale) || languages[0];

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className={cn(
          isDesktop ? "w-fit h-9 gap-2 px-3" : "w-full h-9 gap-2 px-3",
          isDesktop
            ? navbarColor === "black"
              ? "border-none text-black font-medium px-0"
              : "border-none text-white font-medium px-0"
            : "border-gray-300 bg-white text-black hover:bg-gray-50",
          className
        )}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.label}
            width={20}
            height={15}
            className="rounded-sm object-cover flex-shrink-0"
            unoptimized
          />
          <SelectValue>{currentLanguage.label}</SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            <div className="flex items-center gap-2">
              <Image
                src={language.flag}
                alt={language.label}
                width={20}
                height={15}
                className="rounded-sm object-cover"
                unoptimized
              />
              <span>{language.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
