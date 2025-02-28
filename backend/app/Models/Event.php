<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $guarded = [];
    
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function host()
    {
        return $this->belongsTo(User::class, 'user_id');
    }   

}
