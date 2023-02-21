import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const PUBLIC_FILE = /\.(.*)$/;

const companyAccess = [
  '/dashboard',
  '/add-order',
  '/order-history',
  '/order-request',
  '/create-job',
  '/manage-jobs',
  '/job-request',
  '/add-service',
  '/services-inventory',
  '/add-new-user',
  '/manage-users',
  '/schedule',
];

const employeeAccess = ['/dashboard', '/my-jobs', '/schedule', '/job-tracking'];

const customerAccess = ['/dashboard', '/my-orders'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse;

  console.log(pathname);

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/county-service') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/about') ||
    pathname === '/' ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const payload = await getToken({
    req: req,
    cookieName: process.env.COOKIES_NAME,
    secret: process.env.JWR_SECRETE,
  });

  console.log(payload);

  if (!payload) {
    req.nextUrl.pathname = '/login';
    return res.redirect(req.nextUrl);
  }

  if (
    payload.role === 'MOVING_COMPANY' &&
    !companyAccess.some((link) => pathname.startsWith(link))
  ) {
    req.nextUrl.pathname = '/dashboard';
    return res.redirect(req.nextUrl);
  } else if (
    payload.role === 'MOVER' &&
    !employeeAccess.some((link) => pathname.startsWith(link))
  ) {
    req.nextUrl.pathname = '/dashboard';
    return res.redirect(req.nextUrl);
  } else if (
    payload.role === 'MOVER' &&
    !customerAccess.some((link) => pathname.startsWith(link))
  ) {
    req.nextUrl.pathname = '/dashboard';
    return res.redirect(req.nextUrl);
  }
}

// https://stackoverflow.com/questions/73229148/uncaught-syntaxerror-expected-expression-got-while-using-next-js-middlewar
// export const config = {
//   matcher: [
//     '/dashboard',
//     '/add-order',
//     '/order-history',
//     '/order-request',
//     '/create-job',
//     '/manage-jobs',
//     '/job-request',
//     '/add-service',
//     '/services-inventory',
//     '/add-new-user',
//     '/manage-users',
//     '/order-scheduled',
//   ],
// };
