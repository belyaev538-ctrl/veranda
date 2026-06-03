import type { ContactChannelId } from "@/lib/constants";
import type { SiteVariant } from "@/lib/site-variant";

export type LeadSource = "modal" | "cta";

export type LeadPayload = {
  name: string;
  phone: string;
  source: LeadSource;
  variant?: SiteVariant;
  channels?: ContactChannelId[];
  telegramHandle?: string;
  comment?: string;
  yacht?: string;
  /** Страница, с которой отправили (pathname) */
  page?: string;
};
