"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Headphones,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Send,
  Truck,
  AlertTriangle,
  CircleAlert,
  X,
  Sparkles,
} from "lucide-react";

const orders = [
  {
    id: "ORD-2026-001",
    status: "shipped",
    orderDate: "September 20, 2026",
    estimatedDate: "September 25, 2026",
    estimatedTime: "10:00 AM - 2:00 PM",
    trackingNumber: "TRK-845729103",
    courier: "Pathao Courier",
    address: "Mirpur 12, Dhaka, Bangladesh",
    items: [
      {
        name: "Wireless Headphones",
        quantity: 1,
        price: 2500,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      },
      {
        name: "USB-C Charging Cable",
        quantity: 2,
        price: 450,
        image:
          "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=300",
      },
    ],
    subtotal: 3400,
    shipping: 60,
    total: 3460,
  },

  {
    id: "ORD-2026-002",
    status: "processing",
    orderDate: "September 22, 2026",
    estimatedDate: "September 28, 2026",
    estimatedTime: "10:00 AM - 6:00 PM",
    trackingNumber: null,
    courier: null,
    address: "Mirpur 12, Dhaka, Bangladesh",
    items: [
      {
        name: "Smart Watch",
        quantity: 1,
        price: 4200,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      },
    ],
    subtotal: 4200,
    shipping: 80,
    total: 4280,
  },

  {
    id: "ORD-2026-003",
    status: "delivered",
    orderDate: "September 15, 2026",
    estimatedDate: "September 20, 2026",
    estimatedTime: "2:00 PM - 5:00 PM",
    trackingNumber: "TRK-238945601",
    courier: "Steadfast Courier",
    address: "Mirpur 12, Dhaka, Bangladesh",
    deliveredAt: "September 20, 2026 at 3:45 PM",
    items: [
      {
        name: "Mechanical Keyboard",
        quantity: 1,
        price: 3500,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300",
      },
    ],
    subtotal: 3500,
    shipping: 60,
    total: 3560,
  },

  {
    id: "ORD-2026-004",
    status: "delayed",
    orderDate: "September 16, 2026",
    estimatedDate: "September 21, 2026",
    estimatedTime: "10:00 AM - 2:00 PM",
    trackingNumber: "TRK-567893421",
    courier: "RedX",
    address: "Mirpur 12, Dhaka, Bangladesh",
    items: [
      {
        name: "Laptop Backpack",
        quantity: 1,
        price: 1800,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
      },
    ],
    subtotal: 1800,
    shipping: 60,
    total: 1860,
  },
];

const steps = [
  {
    id: "processing",
    title: "Order Confirmed",
    description: "Your order has been received.",
    icon: Package,
  },
  {
    id: "shipped",
    title: "Shipped",
    description: "Your package has left the warehouse.",
    icon: Truck,
  },
  {
    id: "out-for-delivery",
    title: "Out for Delivery",
    description: "Your package is on its way to you.",
    icon: MapPin,
  },
  {
    id: "delivered",
    title: "Delivered",
    description: "Your package has been delivered.",
    icon: CheckCircle2,
  },
];

/* -----------------------------
   STATUS HELPERS
----------------------------- */

function getStatusText(status) {
  const statusMap = {
    processing: "Processing",
    shipped: "Shipped",
    "out-for-delivery": "Out for Delivery",
    delivered: "Delivered",
    delayed: "Delayed",
  };

  return statusMap[status];
}

function getStatusClass(status) {
  const classes = {
    processing:
      "border-amber-300 bg-amber-100 text-amber-700",
    shipped:
      "border-blue-300 bg-blue-100 text-blue-700",
    "out-for-delivery":
      "border-purple-300 bg-purple-100 text-purple-700",
    delivered:
      "border-emerald-300 bg-emerald-100 text-emerald-700",
    delayed:
      "border-red-300 bg-red-100 text-red-700",
  };

  return classes[status];
}

function getCurrentStep(status) {
  if (status === "processing") return 0;
  if (status === "shipped") return 1;
  if (status === "out-for-delivery") return 2;
  if (status === "delivered") return 3;
  if (status === "delayed") return 1;

  return 0;
}

function money(amount) {
  return `৳${amount.toLocaleString()}`;
}

/* -----------------------------
   FRAMER MOTION VARIANTS
----------------------------- */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 30,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

/* -----------------------------
   MAIN COMPONENT
----------------------------- */

export default function Home() {
  const [selectedOrder, setSelectedOrder] =
    useState(orders[0]);

  const [detailsOpen, setDetailsOpen] =
    useState(true);

  const [supportOpen, setSupportOpen] =
    useState(false);

  const [issueOpen, setIssueOpen] =
    useState(false);

  const [issueType, setIssueType] =
    useState("");

  const [issueMessage, setIssueMessage] =
    useState("");

  const [submitted, setSubmitted] =
    useState(false);

  const currentStep = getCurrentStep(
    selectedOrder.status
  );

  const trackingUnavailable =
    selectedOrder.status === "processing" &&
    !selectedOrder.trackingNumber;

  const deliveredOrder =
    selectedOrder.status === "delivered";

  const delayedOrder =
    selectedOrder.status === "delayed";

  function handleIssueSubmit(e) {
    e.preventDefault();

    if (!issueType || !issueMessage.trim()) {
      return;
    }

    setSubmitted(true);
  }

  function closeIssueModal() {
    setIssueOpen(false);

    setTimeout(() => {
      setSubmitted(false);
      setIssueType("");
      setIssueMessage("");
    }, 200);
  }

  function handleOrderChange(e) {
    const order = orders.find(
      (item) => item.id === e.target.value
    );

    setSelectedOrder(order);
    setDetailsOpen(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-3 py-5 sm:px-6 sm:py-8">
      {/* =========================================
          ANIMATED BACKGROUND
      ========================================= */}

      <motion.div
        className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -right-24 top-72 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-300/15 blur-3xl"
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* =========================================
            HEADER
        ========================================= */}

        <motion.div
          variants={itemVariants}
          className="mb-6 flex items-center gap-3"
        >
          <motion.button
            type="button"
            whileHover={{
              scale: 1.1,
              rotate: -5,
            }}
            whileTap={{
              scale: 0.9,
            }}
            onClick={() => window.history.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
          </motion.button>

          <div>
            <p className="text-xs font-medium text-slate-400">
              Orders
            </p>

            <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-xl font-extrabold text-transparent sm:text-3xl">
              Track Your Order
            </h1>
          </div>

          <motion.div
            className="ml-auto hidden rounded-full bg-indigo-100 p-3 text-indigo-600 sm:block"
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles size={20} />
          </motion.div>
        </motion.div>

        {/* =========================================
            ORDER SELECTOR
        ========================================= */}

        <motion.section
          variants={itemVariants}
          whileHover={{
            y: -3,
            boxShadow:
              "0 20px 40px rgba(79,70,229,0.10)",
          }}
          className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">
                  Order
                </p>

                <p className="font-semibold text-slate-800">
                  Select an order
                </p>
              </div>

              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="rounded-xl bg-indigo-100 p-2 text-indigo-600"
              >
                <Package size={24} />
              </motion.div>
            </div>

            <select
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition-all duration-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              value={selectedOrder.id}
              onChange={handleOrderChange}
            >
              {orders.map((order) => (
                <option
                  key={order.id}
                  value={order.id}
                >
                  {order.id} —{" "}
                  {getStatusText(order.status)}
                </option>
              ))}
            </select>
          </div>
        </motion.section>

        {/* =========================================
            MAIN ORDER CARD
        ========================================= */}

        <motion.section
          variants={itemVariants}
          whileHover={{
            y: -4,
            boxShadow:
              "0 20px 45px rgba(0,0,0,0.10)",
          }}
          className="relative mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="p-4 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">
                  Order number
                </p>

                <h2 className="text-lg font-bold text-slate-800">
                  {selectedOrder.id}
                </h2>
              </div>

              <motion.span
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusClass(
                  selectedOrder.status
                )}`}
              >
                <motion.span
                  className="h-2 w-2 rounded-full bg-current"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                  }}
                />

                {delayedOrder && (
                  <AlertTriangle size={13} />
                )}

                {getStatusText(
                  selectedOrder.status
                )}
              </motion.span>
            </div>

            <div className="my-4 h-px bg-slate-100" />

            <div className="grid gap-3 sm:grid-cols-2">
              {/* DELIVERY */}

              <motion.div
                whileHover={{
                  scale: 1.02,
                  x: 3,
                }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="flex gap-3">
                  <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Estimated delivery
                    </p>

                    <p className="text-sm font-semibold text-slate-800">
                      {selectedOrder.estimatedDate}
                    </p>

                    <p className="text-xs text-slate-500">
                      {selectedOrder.estimatedTime}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ADDRESS */}

              <motion.div
                whileHover={{
                  scale: 1.02,
                  x: 3,
                }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 transition-all duration-300 hover:border-purple-200 hover:bg-purple-50"
              >
                <div className="flex gap-3">
                  <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                    <MapPin size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">
                      Delivery address
                    </p>

                    <p className="break-words text-sm font-semibold text-slate-800">
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* =========================================
            ALERTS
        ========================================= */}

        <AnimatePresence mode="wait">
          {/* TRACKING NOT AVAILABLE */}

          {trackingUnavailable && (
            <motion.div
              key="tracking"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 shadow-sm"
            >
              <Clock3
                size={21}
                className="mt-0.5 shrink-0"
              />

              <div>
                <h3 className="font-bold">
                  Tracking is not available yet
                </h3>

                <p className="mt-1 text-xs text-amber-700">
                  Your order exists, but the courier has
                  not provided tracking information yet.
                </p>
              </div>
            </motion.div>
          )}

          {/* DELIVERED BUT NOT RECEIVED */}

          {deliveredOrder && (
            <motion.div
              key="delivered"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mb-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm"
            >
              <CircleAlert
                size={21}
                className="mt-0.5 shrink-0"
              />

              <div className="flex-1">
                <h3 className="font-bold">
                  Did not receive your order?
                </h3>

                <p className="mt-1 text-xs text-red-700">
                  Our system says this order was delivered.
                  If you did not receive it, report the
                  issue.
                </p>

                <button
                  type="button"
                  onClick={() => setIssueOpen(true)}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-red-500 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-lg active:scale-95"
                >
                  <CircleAlert size={14} />
                  Report missing delivery
                </button>
              </div>
            </motion.div>
          )}

          {/* DELAYED */}

          {delayedOrder && (
            <motion.div
              key="delayed"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mb-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 shadow-sm"
            >
              <AlertTriangle
                size={21}
                className="mt-0.5 shrink-0"
              />

              <div className="flex-1">
                <h3 className="font-bold">
                  Your order is delayed
                </h3>

                <p className="mt-1 text-xs text-red-700">
                  The estimated delivery time has passed.
                  We are working to provide an updated
                  estimate.
                </p>

                <button
                  type="button"
                  onClick={() => setSupportOpen(true)}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg active:scale-95"
                >
                  <Headphones size={14} />
                  Contact support
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================
            DELIVERY TIMELINE
        ========================================= */}

        <motion.section
          variants={itemVariants}
          whileHover={{
            y: -3,
          }}
          className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="p-4 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Delivery progress
                </h2>

                <p className="text-xs text-slate-400">
                  Follow your package
                </p>
              </div>

              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-xl bg-indigo-100 p-2 text-indigo-600"
              >
                <Truck size={23} />
              </motion.div>
            </div>

            <div>
              {steps.map((step, index) => {
                const Icon = step.icon;

                const completed =
                  index <= currentStep;

                const current =
                  index === currentStep;

                return (
                  <motion.div
                    key={step.id}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.45,
                    }}
                    className="flex gap-3"
                  >
                    {/* ICON */}

                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={
                          current
                            ? {
                                scale: [1, 1.08, 1],
                              }
                            : {}
                        }
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                        }}
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${
                          completed
                            ? "border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200"
                            : "border-slate-200 bg-slate-50 text-slate-300"
                        }`}
                      >
                        {completed ? (
                          <Icon size={18} />
                        ) : (
                          <span className="text-xs font-semibold">
                            {index + 1}
                          </span>
                        )}
                      </motion.div>

                      {index !==
                        steps.length - 1 && (
                        <motion.div
                          initial={{
                            scaleY: 0,
                          }}
                          animate={{
                            scaleY: 1,
                          }}
                          transition={{
                            delay:
                              index * 0.2 + 0.3,
                            duration: 0.5,
                          }}
                          style={{
                            transformOrigin:
                              "top",
                          }}
                          className={`h-14 w-0.5 ${
                            index < currentStep
                              ? "bg-gradient-to-b from-indigo-500 to-purple-500"
                              : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1 pb-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`text-sm font-semibold ${
                            current
                              ? "text-indigo-600"
                              : "text-slate-800"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {current && (
                          <motion.span
                            initial={{
                              opacity: 0,
                              scale: 0.7,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-600"
                          >
                            Current
                          </motion.span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* DELAY MESSAGE */}

            {delayedOrder && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                }}
                className="rounded-xl border border-red-200 bg-red-50 p-3"
              >
                <div className="flex gap-2">
                  <AlertTriangle
                    size={18}
                    className="shrink-0 text-red-500"
                  />

                  <div>
                    <p className="text-sm font-semibold text-red-600">
                      Delivery progress is delayed.
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Contact support for the latest
                      information.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TRACKING MESSAGE */}

            {trackingUnavailable && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="rounded-xl border border-amber-200 bg-amber-50 p-3"
              >
                <div className="flex gap-2">
                  <Clock3
                    size={18}
                    className="shrink-0 text-amber-500"
                  />

                  <p className="text-sm font-semibold text-amber-700">
                    Tracking information will appear once
                    the courier updates the shipment.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* =========================================
            TRACKING INFORMATION
        ========================================= */}

        <motion.section
          variants={itemVariants}
          whileHover={{
            y: -3,
          }}
          className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{
                  rotate: 10,
                  scale: 1.1,
                }}
                className="rounded-xl bg-indigo-100 p-2 text-indigo-600"
              >
                <Truck size={20} />
              </motion.div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Tracking information
                </h2>

                <p className="text-xs text-slate-400">
                  Shipment details
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <InfoRow
                label="Tracking number"
                value={
                  selectedOrder.trackingNumber ||
                  "Not available yet"
                }
              />

              <div className="h-px bg-slate-100" />

              <InfoRow
                label="Courier"
                value={
                  selectedOrder.courier ||
                  "Not assigned yet"
                }
              />

              <div className="h-px bg-slate-100" />

              <InfoRow
                label="Order date"
                value={selectedOrder.orderDate}
              />

              {selectedOrder.deliveredAt && (
                <>
                  <div className="h-px bg-slate-100" />

                  <InfoRow
                    label="Delivered at"
                    value={selectedOrder.deliveredAt}
                  />
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* =========================================
            ORDER SUMMARY
        ========================================= */}

        <motion.section
          variants={itemVariants}
          className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="p-4 sm:p-6">
            <motion.button
              type="button"
              whileTap={{
                scale: 0.98,
              }}
              className="flex w-full items-center justify-between text-left"
              onClick={() =>
                setDetailsOpen(!detailsOpen)
              }
              aria-expanded={detailsOpen}
            >
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Order summary
                </h2>

                <p className="text-xs text-slate-400">
                  {selectedOrder.items.length} product(s)
                </p>
              </div>

              <motion.div
                animate={{
                  rotate: detailsOpen ? 0 : 180,
                }}
                className="rounded-full bg-slate-100 p-2 text-slate-600"
              >
                {detailsOpen ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </motion.div>
            </motion.button>

            <AnimatePresence initial={false}>
              {detailsOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="overflow-hidden"
                >
                  {/* PRODUCTS */}

                  <div className="mt-5 space-y-4">
                    {selectedOrder.items.map(
                      (item, index) => (
                        <motion.div
                          key={item.name}
                          initial={{
                            opacity: 0,
                            x: -15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.1,
                          }}
                          whileHover={{
                            scale: 1.015,
                            x: 3,
                          }}
                          className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50"
                        >
                          <motion.img
                            whileHover={{
                              scale: 1.08,
                              rotate: 2,
                            }}
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 shrink-0 rounded-xl border border-slate-200 object-cover shadow-sm"
                          />

                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-semibold text-slate-800">
                              {item.name}
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                              Quantity: {item.quantity}
                            </p>

                            <p className="mt-1 text-sm font-semibold text-indigo-600">
                              {money(item.price)}
                            </p>
                          </div>
                        </motion.div>
                      )
                    )}
                  </div>

                  <div className="my-5 h-px bg-slate-100" />

                  {/* PRICE */}

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        Subtotal
                      </span>

                      <span className="font-medium text-slate-700">
                        {money(
                          selectedOrder.subtotal
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        Shipping
                      </span>

                      <span className="font-medium text-slate-700">
                        {money(
                          selectedOrder.shipping
                        )}
                      </span>
                    </div>

                    <div className="my-3 h-px bg-slate-100" />

                    <motion.div
                      whileHover={{
                        scale: 1.02,
                      }}
                      className="flex justify-between rounded-xl bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-3 text-base font-bold"
                    >
                      <span className="text-slate-800">
                        Total
                      </span>

                      <span className="text-indigo-600">
                        {money(selectedOrder.total)}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* =========================================
            HELP SECTION
        ========================================= */}

        <motion.section
          variants={itemVariants}
          whileHover={{
            y: -4,
          }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="rounded-xl bg-indigo-100 p-2 text-indigo-600"
              >
                <Headphones size={22} />
              </motion.div>

              <div>
                <h2 className="text-lg font-extrabold text-slate-800">
                  Need help?
                </h2>

                <p className="text-sm text-slate-500">
                  Get help with your order or report a
                  delivery problem.
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {/* CONTACT SUPPORT */}

              <motion.button
                type="button"
                onClick={() => setSupportOpen(true)}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:shadow-xl"
              >
                <Headphones size={18} />
                Contact support
              </motion.button>

              {/* REPORT ISSUE */}

              <motion.button
                type="button"
                onClick={() => setIssueOpen(true)}
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:shadow-xl"
              >
                <CircleAlert size={18} />
                Report delivery issue
              </motion.button>
            </div>
          </div>
        </motion.section>

        <motion.p
          variants={itemVariants}
          className="py-6 text-center text-xs text-slate-400"
        >
          Need more assistance? Our support team is here
          to help.
        </motion.p>
      </motion.div>

      {/* =========================================
          SUPPORT MODAL
      ========================================= */}

      <AnimatePresence>
        {supportOpen && (
          <ModalOverlay
            onClose={() => setSupportOpen(false)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            >
              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setSupportOpen(false)
                }
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:rotate-90 hover:bg-slate-100 hover:text-slate-700 active:scale-90"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* HEADER */}

              <div className="mb-5">
                <motion.div
                  initial={{
                    scale: 0,
                    rotate: -20,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600"
                >
                  <Headphones size={23} />
                </motion.div>

                <h3 className="text-xl font-bold text-slate-800">
                  Contact support
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  How would you like to contact us?
                </p>
              </div>

              <div className="space-y-3">
                {/* LIVE CHAT */}

                <SupportOption
                  icon={<MessageCircle size={21} />}
                  title="Live chat"
                  description="Available from 9 AM to 9 PM"
                  buttonText="Start chat"
                  primary
                />

                {/* PHONE */}

                <SupportOption
                  icon={<Phone size={21} />}
                  title="Phone support"
                  description="+880 1XXX-XXXXXX"
                  buttonText="Call support"
                />

                {/* ORDER REFERENCE */}

                <div className="rounded-xl bg-slate-100 p-3">
                  <p className="text-xs text-slate-400">
                    Order reference
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {selectedOrder.id}
                  </p>
                </div>
              </div>

              {/* CLOSE */}

              <div className="mt-5">
                <button
                  type="button"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-100 active:scale-95"
                  onClick={() =>
                    setSupportOpen(false)
                  }
                >
                  Close
                </button>
              </div>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* =========================================
          ISSUE MODAL
      ========================================= */}

      <AnimatePresence>
        {issueOpen && (
          <ModalOverlay onClose={closeIssueModal}>
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            >
              {/* CLOSE */}

              <button
                type="button"
                onClick={closeIssueModal}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-all duration-300 hover:rotate-90 hover:bg-slate-100 hover:text-slate-700 active:scale-90"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: 20,
                    }}
                  >
                    {/* HEADER */}

                    <div className="mb-5">
                      <motion.div
                        animate={{
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500"
                      >
                        <CircleAlert size={23} />
                      </motion.div>

                      <h3 className="text-xl font-bold text-slate-800">
                        Report a delivery issue
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Tell us what happened with your
                        order.
                      </p>
                    </div>

                    <form
                      onSubmit={handleIssueSubmit}
                      className="space-y-4"
                    >
                      {/* ISSUE TYPE */}

                      <div>
                        <label
                          htmlFor="issueType"
                          className="mb-1 block text-sm font-semibold text-slate-700"
                        >
                          Issue type
                        </label>

                        <select
                          id="issueType"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                          value={issueType}
                          onChange={(e) =>
                            setIssueType(
                              e.target.value
                            )
                          }
                          required
                        >
                          <option value="">
                            Select an issue
                          </option>

                          <option value="not-received">
                            Delivered but not received
                          </option>

                          <option value="delayed">
                            Order is delayed
                          </option>

                          <option value="damaged">
                            Package is damaged
                          </option>

                          <option value="wrong-item">
                            Wrong item received
                          </option>

                          <option value="other">
                            Other issue
                          </option>
                        </select>
                      </div>

                      {/* MESSAGE */}

                      <div>
                        <label
                          htmlFor="issueMessage"
                          className="mb-1 block text-sm font-semibold text-slate-700"
                        >
                          Describe the problem
                        </label>

                        <textarea
                          id="issueMessage"
                          className="min-h-28 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                          placeholder="Tell us what happened..."
                          value={issueMessage}
                          onChange={(e) =>
                            setIssueMessage(
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>

                      {/* ORDER */}

                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <p className="text-xs text-slate-400">
                          Order
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {selectedOrder.id}
                        </p>
                      </div>

                      {/* SUBMIT */}

                      <motion.button
                        type="submit"
                        whileHover={{
                          scale: 1.02,
                          y: -2,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:shadow-xl"
                      >
                        <Send size={17} />
                        Submit report
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  /* SUCCESS */

                  <motion.div
                    key="success"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    className="py-6 text-center"
                  >
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                      }}
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-500"
                    >
                      <Check size={30} />
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-800">
                      Report submitted
                    </h3>

                    <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
                      Your delivery issue has been recorded.
                      Our support team would review it in a
                      real application.
                    </p>

                    <motion.button
                      type="button"
                      onClick={closeIssueModal}
                      whileHover={{
                        scale: 1.03,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className="mx-auto mt-5 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:shadow-xl"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </main>
  );
}

/* =========================================
   SUPPORT OPTION
========================================= */

function SupportOption({
  icon,
  title,
  description,
  buttonText,
  primary = false,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        x: 3,
      }}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
    >
      <div className="flex gap-3">
        <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">
          {icon}
        </div>

        <div>
          <p className="font-semibold text-slate-800">
            {title}
          </p>

          <p className="text-xs text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        className={`mt-3 w-full rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 active:scale-95 ${
          primary
            ? "bg-indigo-600 text-white shadow-md hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg"
            : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md"
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}

/* =========================================
   MODAL OVERLAY
========================================= */

function ModalOverlay({ children, onClose }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================
   INFO ROW
========================================= */

function InfoRow({ label, value }) {
  return (
    <motion.div
      whileHover={{
        x: 3,
      }}
      className="flex items-start justify-between gap-4"
    >
      <span className="text-sm text-slate-400">
        {label}
      </span>

      <span className="max-w-[60%] break-words text-right text-sm font-medium text-slate-700">
        {value}
      </span>
    </motion.div>
  );
}