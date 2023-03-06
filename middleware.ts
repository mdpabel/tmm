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
  '/scheduled',
  '/jobs',
];

const employeeAccess = [
  '/dashboard',
  '/my-jobs',
  '/scheduled',
  '/job-tracking',
  '/jobs',
];

const customerAccess = ['/dashboard', '/my-orders'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse;

  const payload = await getToken({
    req: req,
    cookieName: process.env.COOKIES_NAME,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    (pathname.startsWith('/login') || pathname.startsWith('/register')) &&
    payload
  ) {
    req.nextUrl.pathname = '/dashboard';
    return res.redirect(req.nextUrl);
  }

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/county-service') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith('/about') ||
    pathname === '/' ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register')
  ) {
    return NextResponse.next();
  }

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
    payload.role === 'MOVING_CUSTOMER' &&
    !customerAccess.some((link) => pathname.startsWith(link))
  ) {
    req.nextUrl.pathname = '/dashboard';
    return res.redirect(req.nextUrl);
  }
}

// https://stackoverflow.com/questions/73229148/uncaught-syntaxerror-expected-expression-got-while-using-next-js-middlewar
export const config = {
  matcher: [
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
    '/jobs',
    '/my-jobs',
    '/job-tracking',
    '/my-orders',
  ],
};
