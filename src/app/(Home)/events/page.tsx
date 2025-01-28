"use client";
import React, { useState, useEffect } from "react";
type Event = {
  id: string;
  title: string;
  Name: string;
  date: string;
  description: string;
  location: string;
  category: string;
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
    category: "Cultural",
  },
  {
    id: "2",
    title: "Kunbi Mela",
    Name: "Kunbi Community",
    date: "2024-04-05",
    description:
      "This cultural gathering celebrates the Kunbi way of life with folk dances, traditional music, and agricultural exhibitions highlighting Kunbi farmers' contributions to Maharashtra's economy.",
    location: "Solapur, Nagpur",
    category: "Cultural",
  },
  {
    id: "3",
    title: "Dhangar Samaj Gaurav Din",
    Name: "Dhangar Community",
    date: "2025-08-15",
    description:
      "This event celebrates the Dhangar community's contributions to agriculture, animal husbandry, and history, featuring speeches, performances, and social gatherings.",
    location: "Pune, Nashik",
    category: "Cultural",
  },
  {
    id: "4",
    title: "Koli Fishing Festival",
    Name: "Koli Community",
    date: "2025-01-14",
    description:
      "The Koli Fishing Festival honors the fishing heritage of the Koli community with boat races, fishing competitions, and cultural performances, promoting sustainable practices in the industry.",
    location: "Daman, Alibaug",
    category: "Cultural",
  },
  {
    id: "5",
    title: "Kavi Sammelan",
    Name: "Chitpavan Brahmin Community",
    date: "2025-01-15",
    description:
      "This event unites Chitpavan Brahmins from across Maharashtra to discuss social, cultural, and educational issues through lectures, seminars, and intellectual discussions on community welfare.",
    location: "Pune, Mumbai",
    category: "Educational",
  },
  {
    id: "6",
    title: "Agri Cultural Meet",
    Name: "Agri community",
    date: "2025-06-10",
    description:
      "The Agri Cultural Meet gathers the Agri community to discuss education, employment, and rural development, featuring cultural performances, art exhibitions, and youth networking opportunities.",
    location: "Pune, Raigad",
    category: "Cultural",
  },
  {
    id: "7",
    title: "Mali Wedding Traditions",
    Name: "Mali community",
    date: "2025-09-30",
    description:
      "The Mali Wedding is a traditional ceremony featuring floral decorations and rituals, reflecting the community's heritage and connection to nature and horticulture. The celebrations highlight flower-based offerings and cultural traditions.",
    location: "Nashik, Satara",
    category: "Cultural",
  },
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(eventsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFilteredEvents(eventsData);
      setLoading(false);
    }, 1000);
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterEvents(query, selectedCategory);
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterEvents(searchQuery, category);
  }; 
  const filterEvents = (query: string, category: string) => {
    const filtered = eventsData.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query);
      const matchesCategory = category === "All" || event.category === category;
      return matchesSearch && matchesCategory;
    });
    setFilteredEvents(filtered);
  };

  return (
    <div className="max-w-5xl mx-auto p-10 bg-base-200 rounded-lg shadow-lg">
      <h1
        className="text-4xl font-bold text-center mb-6"
        style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
      >
        Upcoming Events
      </h1>
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search events..."
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="mb-6 flex justify-center space-x-4">
        {["All", "Cultural", "Educational"].map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin text-primary h-10 w-10"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="card bg-primary text-primary-content shadow-lg cursor-pointer hover:bg-primary-focus transition-transform transform hover:scale-105"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="card-body">
                <h3
                  className="font-semibold text-2xl"
                  style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)" }}
                >
                  {event.title}
                </h3>
                <p
                  className="text-sm mt-2"
                  style={{ fontSize: "clamp(0.875rem, 2.5vw, 1rem)" }}
                >
                  {event.description}
                </p>
                <p className="text-sm text-right">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setSelectedEvent(null)}
            >
              ✕
            </button>
            <h2
              className="text-2xl font-bold mb-4"
              style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
            >
              {selectedEvent.title}
            </h2>
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
