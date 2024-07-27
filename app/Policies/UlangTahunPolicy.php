<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\UlangTahun;
use App\Models\User;

class UlangTahunPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, UlangTahun $ulangTahun): bool
    {
        return $user->id === $ulangTahun->id_user;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, UlangTahun $ulangTahun): bool
    {
        return $user->id === $ulangTahun->id_user;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, UlangTahun $ulangTahun): bool
    {
        return $user->id === $ulangTahun->id_user;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, UlangTahun $ulangTahun): bool
    {
        return $user->id === $ulangTahun->id_user;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, UlangTahun $ulangTahun): bool
    {
        return $user->id === $ulangTahun->id_user;
    }
}