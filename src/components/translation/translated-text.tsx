'use client'

import * as React from "react";

import { useTranslation } from "react-i18next";

interface TranslatedTextProps {
  tPath: string;
}

const TranslatedText: React.FC<TranslatedTextProps> = ({ tPath }) => {
  const { t } = useTranslation();

  return <>{t(tPath)}</>;
};

export default TranslatedText;
