const yachtProperties = {
  name: {
    type: "string",
    minLength: 3,
    example: "Luxury Yacht",
  },
  description: {
    type: "string",
    minLength: 10,
    example: "Luxury yacht for private trips",
  },
  pricePerDay: {
    type: "number",
    minimum: 0,
    exclusiveMinimum: true,
    example: 5000,
  },
  image: {
    type: "string",
    format: "uri",
    example: "https://example.com/yacht.jpg",
  },
  location: {
    type: "string",
    minLength: 2,
    example: "Hurghada",
  },
  capacity: {
    type: "integer",
    minimum: 1,
    example: 10,
  },
  available: {
    type: "boolean",
    example: true,
  },
};

const yachtIdParameter = {
  name: "id",
  in: "path",
  required: true,
  description: "MongoDB Yacht ID",
  schema: {
    type: "string",
    pattern: "^[0-9a-fA-F]{24}$",
  },
};

const bookingIdParameter = {
  name: "bookingId",
  in: "path",
  required: true,
  description: "MongoDB Booking ID",
  schema: {
    type: "string",
    pattern: "^[0-9a-fA-F]{24}$",
  },
};

const authRequired = [{ bearerAuth: [] }];

export const swaggerSpec = {
  openapi: "3.0.0",

  info: {
    title: "Yacht Booking API",
    version: "1.0.0",
    description:
      "REST API for yacht management, user authentication and yacht reservations. Built with Node.js, Express, TypeScript, MongoDB, Redis and JWT.",
  },

  servers: [
    {
      url: "/",
      description: "Current API Server",
    },
  ],

  tags: [
    {
      name: "Yachts",
      description: "Yacht management and Redis caching",
    },
    {
      name: "Users",
      description: "Authentication and user management",
    },
    {
      name: "Bookings",
      description: "Yacht reservations and booking management",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },

    schemas: {
      CreateYacht: {
        type: "object",
        additionalProperties: false,
        required: [
          "name",
          "description",
          "pricePerDay",
          "image",
          "location",
          "capacity",
        ],
        properties: yachtProperties,
      },

      UpdateYacht: {
        type: "object",
        additionalProperties: false,
        minProperties: 1,
        properties: yachtProperties,
      },

      RegisterUser: {
        type: "object",
        additionalProperties: false,
        required: ["username", "email", "password"],
        properties: {
          username: {
            type: "string",
            minLength: 3,
            example: "Demo User",
          },
          email: {
            type: "string",
            format: "email",
            example: "demo@example.com",
          },
          password: {
            type: "string",
            minLength: 8,
            format: "password",
            example: "DemoPassword123",
          },
        },
      },

      LoginUser: {
        type: "object",
        additionalProperties: false,
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "demo@example.com",
          },
          password: {
            type: "string",
            minLength: 1,
            format: "password",
            example: "DemoPassword123",
          },
        },
      },

      CreateBooking: {
        type: "object",
        additionalProperties: false,
        required: ["yachtId", "startDate", "endDate"],
        properties: {
          yachtId: {
            type: "string",
            pattern: "^[0-9a-fA-F]{24}$",
            example: "507f1f77bcf86cd799439011",
          },
          startDate: {
            type: "string",
            format: "date",
            example: "2027-06-15",
          },
          endDate: {
            type: "string",
            format: "date",
            example: "2027-06-18",
          },
        },
      },
    },
  },

  paths: {
    // =========================
    // YACHTS
    // =========================

    "/yachts": {
      get: {
        tags: ["Yachts"],
        summary: "Get all yachts",
        description:
          "Public endpoint. Retrieves yachts using Redis caching with MongoDB fallback.",
        responses: {
          "200": {
            description: "Yachts retrieved successfully",
          },
          "500": {
            description: "Error fetching yachts",
          },
        },
      },

      post: {
        tags: ["Yachts"],
        summary: "Create a yacht",
        description:
          "Admin only. Creates a yacht and invalidates the yachts cache.",
        security: authRequired,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateYacht",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Yacht created successfully",
          },
          "400": {
            description: "Invalid or missing fields",
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Admin access required",
          },
          "500": {
            description: "Failed to create yacht",
          },
        },
      },
    },

    "/yachts/{id}": {
      parameters: [yachtIdParameter],

      get: {
        tags: ["Yachts"],
        summary: "Get yacht by ID",
        responses: {
          "200": {
            description: "Yacht retrieved successfully",
          },
          "400": {
            description: "Invalid yacht ID",
          },
          "404": {
            description: "Yacht not found",
          },
          "500": {
            description: "Failed to fetch yacht",
          },
        },
      },

      put: {
        tags: ["Yachts"],
        summary: "Update a yacht",
        description:
          "Admin only. Updates yacht details and invalidates the cache.",
        security: authRequired,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateYacht",
              },
              example: {
                pricePerDay: 6000,
                capacity: 12,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Yacht updated successfully",
          },
          "400": {
            description: "Invalid request data",
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Admin access required",
          },
          "404": {
            description: "Yacht not found",
          },
          "500": {
            description: "Failed to update yacht",
          },
        },
      },

      delete: {
        tags: ["Yachts"],
        summary: "Delete a yacht",
        description: "Admin only. Deletes a yacht and invalidates the cache.",
        security: authRequired,
        responses: {
          "200": {
            description: "Yacht deleted successfully",
          },
          "400": {
            description: "Invalid yacht ID",
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Admin access required",
          },
          "404": {
            description: "Yacht not found",
          },
          "500": {
            description: "Failed to delete yacht",
          },
        },
      },
    },

    // =========================
    // USERS
    // =========================

    "/users/register": {
      post: {
        tags: ["Users"],
        summary: "Register a new user",
        description:
          "Creates a user with a hashed password and the default user role. Rate limited.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterUser",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "User registered successfully",
            content: {
              "application/json": {
                example: {
                  message: "User registered successfully",
                  user: {
                    username: "Demo User",
                    email: "demo@example.com",
                    role: "user",
                  },
                },
              },
            },
          },
          "400": {
            description: "Validation failed",
          },
          "409": {
            description: "User already exists",
          },
          "429": {
            description: "Too many requests",
          },
          "500": {
            description: "Error registering user",
          },
        },
      },
    },

    "/users/login": {
      post: {
        tags: ["Users"],
        summary: "Login user",
        description:
          "Authenticates a user and returns a JWT valid for one hour. Rate limited.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginUser",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "User logged in successfully",
            content: {
              "application/json": {
                example: {
                  message: "User logged in successfully",
                  email: "demo@example.com",
                  role: "user",
                  token: "your-jwt-token",
                },
              },
            },
          },
          "400": {
            description: "Validation failed",
          },
          "401": {
            description: "Invalid credentials",
          },
          "429": {
            description: "Too many login attempts",
          },
          "500": {
            description: "Error logging in user",
          },
        },
      },
    },

    "/users": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Admin only.",
        security: authRequired,
        responses: {
          "200": {
            description: "Users retrieved successfully",
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Admin access required",
          },
          "500": {
            description: "Error fetching users",
          },
        },
      },
    },

    // =========================
    // BOOKINGS
    // =========================

    "/bookings": {
      post: {
        tags: ["Bookings"],
        summary: "Create a booking",
        description:
          "Creates a yacht reservation using MongoDB transactions to prevent overlapping bookings. End date must be after start date.",
        security: authRequired,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateBooking",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Booking created successfully",
          },
          "400": {
            description:
              "Invalid dates, yacht unavailable, overlapping booking or booking creation failed",
          },
          "401": {
            description: "Unauthorized",
          },
        },
      },
    },

    "/bookings/myBookings": {
      get: {
        tags: ["Bookings"],
        summary: "Get my bookings",
        description: "Returns bookings belonging to the authenticated user.",
        security: authRequired,
        responses: {
          "200": {
            description: "Bookings retrieved successfully",
          },
          "401": {
            description: "Unauthorized",
          },
          "500": {
            description: "Failed to retrieve bookings",
          },
        },
      },
    },

    "/bookings/all": {
      get: {
        tags: ["Bookings"],
        summary: "Get all bookings",
        description: "Admin only. Returns all bookings.",
        security: authRequired,
        responses: {
          "200": {
            description: "Bookings retrieved successfully",
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Admin access required",
          },
          "500": {
            description: "Failed to retrieve bookings",
          },
        },
      },
    },

    "/bookings/{bookingId}/cancel": {
      patch: {
        tags: ["Bookings"],
        summary: "Cancel a booking",
        description:
          "Allows an authenticated user to cancel their own booking.",
        security: authRequired,
        parameters: [bookingIdParameter],
        responses: {
          "200": {
            description: "Booking cancelled successfully",
          },
          "400": {
            description: "Invalid ID or failed to cancel booking",
          },
          "401": {
            description: "Unauthorized",
          },
        },
      },
    },

    "/bookings/{bookingId}/confirm": {
      patch: {
        tags: ["Bookings"],
        summary: "Confirm a booking",
        description: "Admin only. Confirms a booking.",
        security: authRequired,
        parameters: [bookingIdParameter],
        responses: {
          "200": {
            description: "Booking confirmed successfully",
          },
          "400": {
            description: "Invalid ID or failed to confirm booking",
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Admin access required",
          },
        },
      },
    },
  },
};
