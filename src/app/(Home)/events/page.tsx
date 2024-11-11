"use client";

import React, { useState } from "react";

// Sample event data structure
type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
};

const eventsData: Event[] = [
  {
    id: "1",
    title: "Community Gathering",
    date: "2024-11-20",
    description: "A chance for community members to meet and network.",
    location: "Community Hall, Main Street",
  },
  {
    id: "2",
    title: "Family Fun Day",
    date: "2024-12-05",
    description: "An event for families with fun activities, games, and food!",
    location: "City Park",
  },
  {
    id: "3",
    title: "Charity Run",
    date: "2025-01-15",
    description: "A 5K charity run to support local schools.",
    location: "Riverbank Trail",
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-10 bg-base-200 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6">Upcoming Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event) => (
          <div
            key={event.id}
            className="card bg-primary text-primary-content shadow-lg cursor-pointer hover:bg-primary-focus transition-colors"
            onClick={() => setSelectedEvent(event)}
          >
            <div className="card-body">
              <h3 className="font-semibold text-2xl">{event.title}</h3>
              <p className="text-lg">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm mt-2">{event.description}</p>
              <p className="text-sm">Location: {event.location}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedEvent.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Location:</strong> {selectedEvent.location}
            </p>
            <p className="mt-4">{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
