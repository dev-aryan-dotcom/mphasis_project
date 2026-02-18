import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const adminGuard: CanActivateFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)

    if(auth.getRole() !== 'admin'){
        router.navigate(['/'])
        return false;
    }
    return true;
}