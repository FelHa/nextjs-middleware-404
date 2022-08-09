import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';
import { default as config } from './next.config.js';

const detectLocale = (req) => {
  let locale = req.nextUrl.locale;

  if (locale === 'default') {
    const cookieLocale = getCookie('NEXT_LOCALE');

    if (cookieLocale) {
      locale = cookieLocale;
    } else {
      const clientLanguage = req.headers
        .get('accept-language')
        .split(',')
        .map((language) => language.split(';')[0].toLowerCase())
        .filter((language) =>
          config.i18n.locales.some((locale) => locale === language)
        )[0];

      locale = clientLanguage;
    }
  }

  return locale;
};

// This function can be marked `async` if using `await` inside
export function middleware(req) {
  //ignore public files, pages and api routes
  const PUBLIC_FILE = /\.(.*)$/;
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  //fetch those arrays from contentful
  const rewriteUrls = [
    { slug: '/team', locale: 'de', target: '/dynamic/bass' },
  ];
  const redirectUrls = [{ slug: '/about', locale: 'de', target: '/hello' }];

  const locale =
    req.nextUrl.locale !== 'default' ? req.nextUrl.locale : detectLocale(req);

  //redirect default locale to detected locale
  if (req.nextUrl.locale === 'default') {
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}`, req.url)
    );
  }

  //handle rewrites
  for (const rewriteUrl of rewriteUrls) {
    if (
      req.nextUrl.pathname.startsWith(rewriteUrl.slug) &&
      req.nextUrl.locale === rewriteUrl.locale
    ) {
      return NextResponse.rewrite(
        new URL(`${locale}${rewriteUrl.target}`, req.url)
      );
    }
  }

  //handle redirects
  for (const redirectUrl of redirectUrls) {
    if (
      req.nextUrl.pathname.startsWith(redirectUrl.slug) &&
      req.nextUrl.locale === redirectUrl.locale
    ) {
      return NextResponse.redirect(
        new URL(`${locale}${redirectUrl.target}`, req.url)
      );
    }
  }
}
