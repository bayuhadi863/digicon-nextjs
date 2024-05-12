import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import { createClient } from '@/utils/supabase/server';

export async function middleware(request: NextRequest) {
  // const response = await updateSession(request);

  // // Mendapatkan informasi pengguna dari sesi yang telah diperbarui
  // const user = response.cookies.get('user');

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register') {
      return NextResponse.rewrite(new URL('/login', request.url));
    }
  }

  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.rewrite(new URL('/', request.url));
  }

  if (user && request.nextUrl.pathname === '/register') {
    return NextResponse.rewrite(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
