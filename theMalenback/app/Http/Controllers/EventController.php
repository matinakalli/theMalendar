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

    // Create a new event
    public function getDateEvents(Request $request, $date)
    {
        $user = auth()->user();
        try {

            $events = Event::where('user_id', $user->id)
            ->where('date', $date)
            ->count();

            return $events;
        } catch(QueryException $e){
            return response($e->getMessage(), 403);
        } catch(Exception $e){
            return response($e->getMessage(), 402);
        }
    }
}
