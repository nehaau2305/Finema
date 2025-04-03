CREATE TABLE IF NOT EXISTS Theater (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Showroom (
    id INT PRIMARY KEY AUTO_INCREMENT,
    theaterID INT NOT NULL,
    room_number VARCHAR(10) NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    FOREIGN KEY (theaterID) REFERENCES Theater(id) ON DELETE CASCADE,
    UNIQUE (theaterID, room_number)
);

CREATE TABLE IF NOT EXISTS Seat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    showroomID INT NOT NULL,
    seat_number INT NOT NULL,
    reserved BOOLEAN DEFAULT 0,
    FOREIGN KEY (showroomID) REFERENCES Showroom(id) ON DELETE CASCADE,
    UNIQUE (showroomID, seat_number)
);

CREATE TABLE IF NOT EXISTS Movie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    director VARCHAR(255),
    producer VARCHAR(255),
    synopsis TEXT,
    trailer_picture VARCHAR(2083), -- URL for picture
    trailer_video VARCHAR(2083), -- URL for video
    mpaa_rating ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
    now_showing BOOLEAN DEFAULT FALSE,
    coming_soon BOOLEAN DEFAULT FALSE,
    cast TEXT
);

CREATE TABLE IF NOT EXISTS Showtime (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movieID INT NOT NULL,
    date DATE NOT NULL,
    --time TIME NOT NULL,

    showroomID INT NOT NULL UNIQUE,  -- Ensures only one showtime per showroom
    FOREIGN KEY (movieID) REFERENCES Movie(id) ON DELETE CASCADE,
    FOREIGN KEY (showroomID) REFERENCES Showroom(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    homeAddress TEXT,
    isAdmin BOOLEAN DEFAULT FALSE,
    status ENUM('Active', 'Inactive', 'Suspended') DEFAULT 'Active',
    promotions BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS Card (
    cardID INT PRIMARY KEY AUTO_INCREMENT,
    userID INT NOT NULL,
    card_number VARCHAR(16) NOT NULL UNIQUE, -- 16-digit card number
    cardholder_name VARCHAR(255) NOT NULL,
    expiration_date VARCHAR(5) NOT NULL,
    cvv VARCHAR(4) NOT NULL, -- Typically 3 or 4 digits
    billing_address TEXT,
    FOREIGN KEY (userID) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Review (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movieID INT NOT NULL,
    userID INT NOT NULL,
    reviewText TEXT,
    reviewStars INT CHECK (reviewStars BETWEEN 1 AND 5),
    FOREIGN KEY (movieID) REFERENCES Movie(id) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Ticket (
    ticketID INT PRIMARY KEY AUTO_INCREMENT,
    showtimeID INT NOT NULL,
    userID INT NOT NULL,
    numSeats INT CHECK (numSeats > 0),
    FOREIGN KEY (showtimeID) REFERENCES Showtime(id) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS TicketSeat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ticketID INT NOT NULL,
    seatID INT NOT NULL,
    FOREIGN KEY (ticketID) REFERENCES Ticket(ticketID) ON DELETE CASCADE,
    FOREIGN KEY (seatID) REFERENCES Seat(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Payment (
    payID INT PRIMARY KEY AUTO_INCREMENT,
    ticketID INT NOT NULL,
    userID INT NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (ticketID) REFERENCES Ticket(ticketID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES User(id) ON DELETE CASCADE
);

