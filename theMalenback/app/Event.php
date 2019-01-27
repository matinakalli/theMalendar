<?php

namespace App;
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
        'title', 'attendees', 'place', 'date', 'time', 'description', 'user_id'
    ];


    public function store(Request $request)
    {

        $event = new Event;

        $event->title = $request->title;
        $event->attendees = $request->attendees;
        $event->place = $request->place;
        $event->date = $request->date;
        $event->time = $request->time;
        $event->description = $request->description;
        $event->user_id = $request->user_id;

        $event->save();
    }
}
