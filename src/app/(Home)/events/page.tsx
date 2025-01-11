"use client";

import React, { useState } from "react";

// Sample event data structure
type Event = {
  id: string;
  title: string;
  Name: String;
  date: string;
  description: string;
  location: string; // add oraginased by
};

const eventsData: Event[] = [
  {
    id: "1",
    title: "Maratha Mahasangh",
    Name: "Maratha Community",
    date: "2024-01-20",
    description:
      "The event addresses issues of reservation, empowerment, and economic upliftment for the Maratha community. It features gatherings of community leaders, activists, and political figures.",
    location: "Mumbai",
  },
  {
    id: "2",
    title: "Kunbi Mela",
    Name: "Kunbi Community",
    date: "2024-04-05",
    description:
      "This cultural gathering celebrates the Kunbi way of life with folk dances, traditional music, and agricultural exhibitions highlighting Kunbi farmers' contributions to Maharashtra's economy.",
    location: "Solapur,Nagpur",
  },
  {
    id: "3",
    title: "Dhangar Samaj Gaurav Din",
    Name: "Dhangar Community",
    date: "2025-08-15",
    description:
      "This event celebrates the Dhangar community's contributions to agriculture, animal husbandry, and history, featuring speeches, performances, and social gatherings.",
    location: "Pune, Nashik",
  },
  {
    id: "4",
    title: "Koli Fishing Festival",
    Name: "Koli Community",
    date: "2025-01-14",
    description:
      "The Koli Fishing Festival honors the fishing heritage of the Koli community with boat races, fishing competitions, and cultural performances, promoting sustainable practices in the industry.",
    location: "Daman, Alibaug",
  },
  {
    id: "5",
    title: "Kavi Sammelan",
    Name: "Chitpavan Brahmin Community",
    date: "2025-01-15",
    description:
      "This event unites Chitpavan Brahmins from across Maharashtra to discuss social, cultural, and educational issues through lectures, seminars, and intellectual discussions on community welfare.",
    location: "Pune, Mumbai",
  },
  {
    id: "6",
    title: "Agri Cultural Meet",
    Name: "Agri community",
    date: "2025-06-10",
    description:
      "The Agri Cultural Meet gathers the Agri community to discuss education, employment, and rural development, featuring cultural performances, art exhibitions, and youth networking opportunities.",
    location: " Pune, Raigad.",
  },
  {
    id: "7",
    title: "Mali Wedding Traditions",
    Name: "Mali community",
    date: "2025-09-30",
    description:
      "The Mali Wedding is a traditional ceremony featuring floral decorations and rituals, reflecting the community's heritage and connection to nature and horticulture. The celebrations highlight flower-based offerings and cultural traditions.",
    location: "Nashik, Satara.",
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
              {/* <p className="text-lg">
                Date: {new Date(event.date).toLocaleDateString()}
              </p> */}
              <p className="text-sm mt-2">{event.description}</p>
              {/* <p className="text-sm">Location: {event.location}</p> */}
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
