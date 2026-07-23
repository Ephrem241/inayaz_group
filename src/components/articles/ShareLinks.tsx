import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { TelegramIcon } from "@/components/icons/TelegramIcon";
import { SITE_URL } from "@/constants/site";
import type { Article } from "@/constants/articles";

type ShareLinksProps = {
  article: Article;
};

export function ShareLinks({ article }: ShareLinksProps) {
  const url = `${SITE_URL}/news/${article.slug}`;

  const links = [
    {
      name: "LinkedIn",
      Icon: LinkedInIcon,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      Icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "Telegram",
      Icon: TelegramIcon,
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(article.title)}`,
    },
  ];

  return (
    <div data-share-links className="flex items-center gap-4">
      <span className="text-sm font-medium">Share:</span>
      {links.map(({ name, Icon, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${name}`}
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
