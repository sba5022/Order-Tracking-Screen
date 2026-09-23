"use client";

import { useState } from "react";
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
    processing: "badge-warning",
    shipped: "badge-info",
    "out-for-delivery": "badge-secondary",
    delivered: "badge-success",
    delayed: "badge-error",
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

export default function Home() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  const [detailsOpen, setDetailsOpen] = useState(true);

  const [supportOpen, setSupportOpen] = useState(false);

  const [issueOpen, setIssueOpen] = useState(false);

  const [issueType, setIssueType] = useState("");

  const [issueMessage, setIssueMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const currentStep = getCurrentStep(selectedOrder.status);

  const trackingUnavailable =
    selectedOrder.status === "processing" &&
    !selectedOrder.trackingNumber;

  const deliveredOrder = selectedOrder.status === "delivered";

  const delayedOrder = selectedOrder.status === "delayed";

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

  return (
    <main className="min-h-screen bg-base-200 px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl">

        {/* HEADER */}

        <div className="mb-5 flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="btn btn-circle btn-ghost btn-sm"
            aria-label="Go back"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="text-xs text-base-content/50">
              Orders
            </p>

            <h1 className="text-xl font-bold sm:text-2xl">
              Track Your Order
            </h1>
          </div>
        </div>

        {/* ORDER SELECTOR */}

        <section className="card mb-4 border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-base-content/50">
                  Order
                </p>

                <p className="font-semibold">
                  Select an order
                </p>
              </div>

              <Package className="text-primary" size={23} />
            </div>

            <select
              className="select select-bordered w-full"
              value={selectedOrder.id}
              onChange={(e) => {
                const order = orders.find(
                  (item) => item.id === e.target.value
                );

                setSelectedOrder(order);
              }}
            >
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.id} — {getStatusText(order.status)}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* MAIN ORDER CARD */}

        <section className="card mb-4 border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body p-4 sm:p-6">

            <div className="flex flex-wrap items-start justify-between gap-3">

              <div>
                <p className="text-xs text-base-content/50">
                  Order number
                </p>

                <h2 className="text-lg font-bold">
                  {selectedOrder.id}
                </h2>
              </div>

              <span
                className={`badge ${getStatusClass(
                  selectedOrder.status
                )} gap-1`}
              >
                {delayedOrder && <AlertTriangle size={13} />}

                {getStatusText(selectedOrder.status)}
              </span>
            </div>

            <div className="my-4 h-px w-full bg-base-300" />

            {/* DELIVERY INFORMATION */}

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="flex gap-3">
                <CalendarDays
                  size={20}
                  className="shrink-0 text-primary"
                />

                <div>
                  <p className="text-xs text-base-content/50">
                    Estimated delivery
                  </p>

                  <p className="text-sm font-semibold">
                    {selectedOrder.estimatedDate}
                  </p>

                  <p className="text-xs text-base-content/60">
                    {selectedOrder.estimatedTime}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin
                  size={20}
                  className="shrink-0 text-primary"
                />

                <div>
                  <p className="text-xs text-base-content/50">
                    Delivery address
                  </p>

                  <p className="text-sm font-semibold">
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* TRACKING NOT AVAILABLE */}

        {trackingUnavailable && (
          <div className="alert alert-warning mb-4 items-start">
            <Clock3 size={21} />

            <div>
              <h3 className="font-bold">
                Tracking is not available yet
              </h3>

              <p className="text-xs">
                Your order exists, but the courier has not
                provided tracking information yet.
              </p>
            </div>
          </div>
        )}

        {/* DELIVERED BUT NOT RECEIVED */}

        {deliveredOrder && (
          <div className="alert alert-error mb-4 items-start">
            <CircleAlert size={21} />

            <div className="flex-1">
              <h3 className="font-bold">
                Did not receive your order?
              </h3>

              <p className="mt-1 text-xs">
                Our system says this order was delivered.
                If you did not receive it, report the issue.
              </p>

              <button
                className="btn btn-error btn-outline btn-xs mt-3"
                onClick={() => setIssueOpen(true)}
              >
                Report missing delivery
              </button>
            </div>
          </div>
        )}

        {/* DELAYED */}

        {delayedOrder && (
          <div className="alert alert-error mb-4 items-start">
            <AlertTriangle size={21} />

            <div className="flex-1">
              <h3 className="font-bold">
                Your order is delayed
              </h3>

              <p className="mt-1 text-xs">
                The estimated delivery time has passed.
                We are working to provide an updated estimate.
              </p>

              <button
                className="btn btn-error btn-outline btn-xs mt-3"
                onClick={() => setSupportOpen(true)}
              >
                Contact support
              </button>
            </div>
          </div>
        )}

        {/* DELIVERY TIMELINE */}

        <section className="card mb-4 border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body p-4 sm:p-6">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  Delivery progress
                </h2>

                <p className="text-xs text-base-content/50">
                  Follow your package
                </p>
              </div>

              <Truck className="text-primary" size={24} />
            </div>

            <div>
              {steps.map((step, index) => {
                const Icon = step.icon;

                const completed = index <= currentStep;

                const current = index === currentStep;

                return (
                  <div
                    key={step.id}
                    className="flex gap-3"
                  >

                    {/* TIMELINE */}

                    <div className="flex flex-col items-center">

                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                          completed
                            ? "border-primary bg-primary text-primary-content"
                            : "border-base-300 bg-base-200 text-base-content/30"
                        }`}
                      >
                        {completed ? (
                          <Icon size={18} />
                        ) : (
                          <span className="text-xs">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {index !== steps.length - 1 && (
                        <div
                          className={`h-12 w-0.5 ${
                            index < currentStep
                              ? "bg-primary"
                              : "bg-base-300"
                          }`}
                        />
                      )}

                    </div>

                    {/* STEP CONTENT */}

                    <div className="min-w-0 flex-1 pb-6">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3
                          className={`text-sm font-semibold ${
                            current
                              ? "text-primary"
                              : ""
                          }`}
                        >
                          {step.title}
                        </h3>

                        {current && (
                          <span className="badge badge-primary badge-xs">
                            Current
                          </span>
                        )}

                      </div>

                      <p className="mt-1 text-xs text-base-content/50">
                        {step.description}
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>

            {delayedOrder && (
              <div className="rounded-xl bg-error/10 p-3">
                <p className="text-sm font-semibold text-error">
                  Delivery progress is delayed.
                </p>

                <p className="mt-1 text-xs text-base-content/60">
                  Contact support for the latest information.
                </p>
              </div>
            )}

            {trackingUnavailable && (
              <div className="rounded-xl bg-warning/10 p-3">
                <p className="text-sm font-semibold text-warning">
                  Tracking information will appear once the
                  courier updates the shipment.
                </p>
              </div>
            )}

          </div>
        </section>

        {/* TRACKING INFORMATION */}

        <section className="card mb-4 border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body p-4 sm:p-6">

            <h2 className="text-lg font-bold">
              Tracking information
            </h2>

            <div className="mt-4 space-y-3">

              <InfoRow
                label="Tracking number"
                value={
                  selectedOrder.trackingNumber ||
                  "Not available yet"
                }
              />

              <div className="h-px bg-base-300" />

              <InfoRow
                label="Courier"
                value={
                  selectedOrder.courier ||
                  "Not assigned yet"
                }
              />

              <div className="h-px bg-base-300" />

              <InfoRow
                label="Order date"
                value={selectedOrder.orderDate}
              />

              {selectedOrder.deliveredAt && (
                <>
                  <div className="h-px bg-base-300" />

                  <InfoRow
                    label="Delivered at"
                    value={selectedOrder.deliveredAt}
                  />
                </>
              )}

            </div>
          </div>
        </section>

        {/* ORDER SUMMARY */}

        <section className="card mb-4 border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body p-4 sm:p-6">

            <button
              className="flex w-full items-center justify-between text-left"
              onClick={() =>
                setDetailsOpen(!detailsOpen)
              }
            >
              <div>
                <h2 className="text-lg font-bold">
                  Order summary
                </h2>

                <p className="text-xs text-base-content/50">
                  {selectedOrder.items.length} product(s)
                </p>
              </div>

              {detailsOpen ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {detailsOpen && (
              <div className="mt-5">

                {/* PRODUCTS */}

                <div className="space-y-4">

                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">

                        <h3 className="text-sm font-semibold">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-base-content/50">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          {money(item.price)}
                        </p>

                      </div>
                    </div>
                  ))}

                </div>

                <div className="my-5 h-px bg-base-300" />

                {/* PRICE */}

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-base-content/60">
                      Subtotal
                    </span>

                    <span>
                      {money(selectedOrder.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-base-content/60">
                      Shipping
                    </span>

                    <span>
                      {money(selectedOrder.shipping)}
                    </span>
                  </div>

                  <div className="my-3 h-px bg-base-300" />

                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>

                    <span>
                      {money(selectedOrder.total)}
                    </span>
                  </div>

                </div>

              </div>
            )}

          </div>
        </section>

        {/* ACTIONS */}

        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="card-body p-4 sm:p-6">

            <h2 className="text-lg font-bold">
              Need help?
            </h2>

            <p className="text-sm text-base-content/60">
              Get help with your order or report a delivery
              problem.
            </p>

            <div className="mt-2 grid gap-3 sm:grid-cols-2">

              <button
                className="btn btn-primary"
                onClick={() => setSupportOpen(true)}
              >
                <Headphones size={18} />
                Contact support
              </button>

              <button
                className="btn btn-outline"
                onClick={() => setIssueOpen(true)}
              >
                <CircleAlert size={18} />
                Report delivery issue
              </button>

            </div>

          </div>
        </section>

        <p className="py-6 text-center text-xs text-base-content/40">
          Need more assistance? Our support team is here to help.
        </p>

      </div>

      {/* SUPPORT MODAL */}

      {supportOpen && (
        <Modal onClose={() => setSupportOpen(false)}>
          <div className="modal-box">

            <button
              onClick={() => setSupportOpen(false)}
              className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="mb-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Headphones size={22} />
              </div>

              <h3 className="text-lg font-bold">
                Contact support
              </h3>

              <p className="mt-1 text-sm text-base-content/60">
                How would you like to contact us?
              </p>
            </div>

            <div className="space-y-3">

              <div className="rounded-xl border border-base-300 p-4">
                <div className="flex gap-3">
                  <MessageCircle
                    className="text-primary"
                    size={21}
                  />

                  <div>
                    <p className="font-semibold">
                      Live chat
                    </p>

                    <p className="text-xs text-base-content/60">
                      Available from 9 AM to 9 PM
                    </p>
                  </div>
                </div>

                <button className="btn btn-primary btn-sm mt-3 w-full">
                  Start chat
                </button>
              </div>

              <div className="rounded-xl border border-base-300 p-4">
                <div className="flex gap-3">
                  <Phone
                    className="text-primary"
                    size={21}
                  />

                  <div>
                    <p className="font-semibold">
                      Phone support
                    </p>

                    <p className="text-xs text-base-content/60">
                      +880 1XXX-XXXXXX
                    </p>
                  </div>
                </div>

                <button className="btn btn-outline btn-sm mt-3 w-full">
                  Call support
                </button>
              </div>

              <div className="rounded-xl bg-base-200 p-3">
                <p className="text-xs text-base-content/60">
                  Order reference
                </p>

                <p className="mt-1 text-sm font-bold">
                  {selectedOrder.id}
                </p>
              </div>

            </div>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSupportOpen(false)}
              >
                Close
              </button>
            </div>

          </div>

          <div
            className="modal-backdrop"
            onClick={() => setSupportOpen(false)}
          />
        </Modal>
      )}

      {/* ISSUE MODAL */}

      {issueOpen && (
        <Modal onClose={closeIssueModal}>

          <div className="modal-box">

            <button
              onClick={closeIssueModal}
              className="btn btn-circle btn-ghost btn-sm absolute right-3 top-3"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <div className="mb-5">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-error/10 text-error">
                    <CircleAlert size={22} />
                  </div>

                  <h3 className="text-lg font-bold">
                    Report a delivery issue
                  </h3>

                  <p className="mt-1 text-sm text-base-content/60">
                    Tell us what happened with your order.
                  </p>
                </div>

                <form
                  onSubmit={handleIssueSubmit}
                  className="space-y-4"
                >

                  <div>
                    <label
                      htmlFor="issueType"
                      className="mb-1 block text-sm font-semibold"
                    >
                      Issue type
                    </label>

                    <select
                      id="issueType"
                      className="select select-bordered w-full"
                      value={issueType}
                      onChange={(e) =>
                        setIssueType(e.target.value)
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

                  <div>
                    <label
                      htmlFor="issueMessage"
                      className="mb-1 block text-sm font-semibold"
                    >
                      Describe the problem
                    </label>

                    <textarea
                      id="issueMessage"
                      className="textarea textarea-bordered min-h-28 w-full"
                      placeholder="Tell us what happened..."
                      value={issueMessage}
                      onChange={(e) =>
                        setIssueMessage(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="rounded-lg bg-base-200 p-3">
                    <p className="text-xs text-base-content/50">
                      Order
                    </p>

                    <p className="text-sm font-semibold">
                      {selectedOrder.id}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    <Send size={17} />
                    Submit report
                  </button>

                </form>
              </>
            ) : (
              <div className="py-6 text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
                  <Check size={30} />
                </div>

                <h3 className="text-xl font-bold">
                  Report submitted
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm text-base-content/60">
                  Your delivery issue has been recorded.
                  Our support team would review it in a real
                  application.
                </p>

                <button
                  className="btn btn-primary mt-5"
                  onClick={closeIssueModal}
                >
                  Done
                </button>

              </div>
            )}

          </div>

          <div
            className="modal-backdrop"
            onClick={closeIssueModal}
          />
        </Modal>
      )}

    </main>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-base-content/50">
        {label}
      </span>

      <span className="max-w-[60%] break-words text-right text-sm font-medium">
        {value}
      </span>
    </div>
  );
}

function Modal({ children }) {
  return (
    <div className="modal modal-open">
      {children}
    </div>
  );
}
