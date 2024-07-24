<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    protected function authenticated(Request $request, $user)
    {
        if($user->hasRole(['super admin', 'admin'])) {
            return redirect()->route('admin.dashboard');
        }
        elseif($user->hasRole('staff')) {
            return redirect()->route('staff.dashboard');
        }
        elseif($user->hasRole(['customer', 'client'])) {
            return redirect()->route('client.dashboard');
        }
    }

    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return $this->loggedOut($request) ?: redirect('/login');
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('auth')->only('logout');
    }
}
