<?php

titlespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'events';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'attendees', 'place', 'time', 'description'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    public function store(Request $request)
    {

        $event = new Event;

        $event->title = $request->title;
        $event->attendees = $request->attendees;
        $event->place = $request->place;
        $event->time = $request->time;
        $event->description = $request->description;

        $event->save();
    }
}
