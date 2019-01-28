<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */

    // Create a new event
    public function create(Request $request)
    {
        try {
            $event = Event::create($request->all());
            return response("Event created.", 201);
        } catch(QueryException $e){
            return response($e->getMessage(), 403);
        } catch(Exception $e){
            return response($e->getMessage(), 402);
        }
    }

    // Count the events of a day
    public function countDateEvents(Request $request, $date)
    {
        $user = auth()->user();
        try {
            $countEvents = Event::where('user_id', $user->id)
            ->where('date', $date)
            ->count();

            return $countEvents;
        } catch(QueryException $e){
            return response($e->getMessage(), 403);
        } catch(Exception $e){
            return response($e->getMessage(), 402);
        }
    }

    // Get the events of a day
    public function getDateEvents(Request $request, $date)
    {
        $user = auth()->user();
        try {
            $events = Event::where('user_id', $user->id)
            ->where('date', $date)
            ->get();

            return $events;
        } catch(QueryException $e){
            return response($e->getMessage(), 403);
        } catch(Exception $e){
            return response($e->getMessage(), 402);
        }
    }

    // Get an event
    public function getEvent(Request $request, $id)
    {
        try {
            $event = Event::find($id);

            return $event;
        } catch(QueryException $e){
            return response($e->getMessage(), 403);
        } catch(Exception $e){
            return response($e->getMessage(), 402);
        }
    }


    // Update an event
    public function updateEvent(Request $request, $id)
    {
        try {
            $event = Event::find($id);
            $event->update($request->all());

            return 'ok';
        } catch(QueryException $e){
            return response($e->getMessage(), 403);
        } catch(Exception $e){
            return response($e->getMessage(), 402);
        }
    }

    // Delete an event
    public function deleteEvent(Request $request, $id)
    {
        try {
            $event = Event::where('id', $id)
            ->get()->first();
            $event->delete();

            return 'ok';
        } catch(QueryException $e){
            return response($e->getMessage(), 403);
        } catch(Exception $e){
            return response($e->getMessage(), 402);
        }
    }
}
