'use client'

import * as React from "react";

import { useTranslation } from "react-i18next";

interface TranslatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  tPath: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ tPath, ...props }) => {
  const { t } = useTranslation();

  return <span {...props}>{t(tPath)}</span>;
};

export default TranslatedText;
