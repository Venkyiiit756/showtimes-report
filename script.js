async function fetchShowtimes() {
  const loading = document.getElementById('loading');
  const container = document.getElementById('table-container');
  loading.style.display = 'block';
  container.innerHTML = ''; // Clear any existing content

  try {
    const response = await fetch('/.netlify/functions/fetchShowtimes');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Process the data as before
    const results = [];

    // Initialize total aggregation variables
    let grandTotalMaxSeats = 0;
    let grandTotalSeatsAvailable = 0;
    let grandTotalBookedTickets = 0;
    let grandTotalGross = 0;
    let grandBookedGross = 0;

    data.ShowDetails.forEach(showDetail => {
      showDetail.Venues.forEach(venue => {
        venue.ShowTimes.forEach(showTime => {
          // Initialize aggregation variables for each venue and showtime
          let totalMaxSeats = 0;
          let totalSeatsAvailable = 0;
          let totalBookedTickets = 0;
          let totalGross = 0;
          let bookedGross = 0;

          showTime.Categories.forEach(category => {
            const maxSeats = parseInt(category.MaxSeats, 10) || 0;
            const seatsAvail = parseInt(category.SeatsAvail, 10) || 0;
            const bookedTickets = maxSeats - seatsAvail;
            const currentPrice = parseFloat(category.CurPrice) || 0;

            totalMaxSeats += maxSeats;
            totalSeatsAvailable += seatsAvail;
            totalBookedTickets += bookedTickets;
            totalGross += maxSeats * currentPrice;
            bookedGross += bookedTickets * currentPrice;
          });

          // Update grand totals
          grandTotalMaxSeats += totalMaxSeats;
          grandTotalSeatsAvailable += totalSeatsAvailable;
          grandTotalBookedTickets += totalBookedTickets;
          grandTotalGross += totalGross;
          grandBookedGross += bookedGross;

          results.push({
            VenueName: venue.VenueName,
            ShowTime: showTime.ShowTime,
            MaxSeats: totalMaxSeats,
            SeatsAvailable: totalSeatsAvailable,
            BookedTickets: totalBookedTickets,
            TotalGross: totalGross.toFixed(2), // Corrected
            BookedGross: bookedGross.toFixed(2) // Corrected
          });
        });
      });
    });

    // Add the total row
    const totalRow = {
      VenueName: "TOTAL",
      ShowTime: "",
      MaxSeats: grandTotalMaxSeats,
      SeatsAvailable: grandTotalSeatsAvailable,
      BookedTickets: grandTotalBookedTickets,
      TotalGross: grandTotalGross.toFixed(2),
      BookedGross: grandBookedGross.toFixed(2)
    };

    // Render the table
    renderTable(results, totalRow);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    container.innerHTML = `<p style="color: red;">Failed to load showtimes data. Please try again later.</p>`;
  } finally {
    loading.style.display = 'none';
  }
}

function renderTable(data, total) {
  const container = document.getElementById('table-container');

  const table = document.createElement('table');

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ["Venue Name", "Show Time", "Max Seats", "Seats Available", "Booked Tickets", "Total Gross", "Booked Gross"];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.innerText = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');

  data.forEach(row => {
    const tr = document.createElement('tr');

    Object.values(row).forEach((cell, index) => {
      const td = document.createElement('td');
      // Format currency fields
      if (index === 5 || index === 6) { // TotalGross or BookedGross
        td.innerText = `$${parseFloat(cell).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      } else {
        td.innerText = cell;
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  // Add total row
  const totalTr = document.createElement('tr');
  totalTr.classList.add('total-row');

  Object.entries(total).forEach(([key, value], index) => {
    const td = document.createElement('td');
    if (key === "VenueName") {
      td.innerText = value;
    } else if (key === "TotalGross" || key === "BookedGross") {
      td.innerText = `$${parseFloat(value).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else {
      td.innerText = value;
    }
    totalTr.appendChild(td);
  });

  tbody.appendChild(totalTr);
  table.appendChild(tbody);

  container.appendChild(table);
}

// Call the function after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchShowtimes);
