
// "use client";

// import { useState } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   Chip,
//   Divider,
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   useDisclosure,
// } from "@heroui/react";
// import {
//   ArrowLeft,
//   CalendarDays,
//   CheckCircle2,
//   ChevronDown,
//   ChevronUp,
//   CircleHelp,
//   Clock3,
//   Headset,
//   MapPin,
//   Package,
//   Phone,
//   Truck,
//   AlertTriangle,
//   FileText,
//   MessageCircle,
//   CircleX,
// } from "lucide-react";

// // --------------------------------------------------
// // STATIC ORDER DATA
// // --------------------------------------------------

// const orders = [
//   {
//     id: "ORD-2026-001",
//     status: "shipped",
//     customerName: "Sumaia Binta Asad",
//     orderDate: "September 20, 2026",
//     estimatedDelivery: "September 25, 2026",
//     estimatedTime: "10:00 AM - 2:00 PM",
//     trackingNumber: "TRK-845729103",
//     courier: "Pathao Courier",
//     shippingAddress: "Mirpur 12, Dhaka, Bangladesh",
//     items: [
//       {
//         id: 1,
//         name: "Wireless Headphones",
//         quantity: 1,
//         price: 2500,
//         image:
//           "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
//       },
//       {
//         id: 2,
//         name: "USB-C Charging Cable",
//         quantity: 2,
//         price: 450,
//         image:
//           "https://images.unsplash.com/photo-1583863788434-e58a36330cf0",
//       },
//     ],
//     subtotal: 3400,
//     shippingFee: 60,
//     total: 3460,
//   },
//   {
//     id: "ORD-2026-002",
//     status: "processing",
//     customerName: "Sumaia Binta Asad",
//     orderDate: "September 22, 2026",
//     estimatedDelivery: "September 28, 2026",
//     estimatedTime: "10:00 AM - 6:00 PM",
//     trackingNumber: null,
//     courier: null,
//     shippingAddress: "Mirpur 12, Dhaka, Bangladesh",
//     items: [
//       {
//         id: 3,
//         name: "Smart Watch",
//         quantity: 1,
//         price: 4200,
//         image:
//           "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
//       },
//     ],
//     subtotal: 4200,
//     shippingFee: 80,
//     total: 4280,
//   },
//   {
//     id: "ORD-2026-003",
//     status: "delivered",
//     customerName: "Sumaia Binta Asad",
//     orderDate: "September 15, 2026",
//     estimatedDelivery: "September 20, 2026",
//     estimatedTime: "2:00 PM - 5:00 PM",
//     deliveredAt: "September 20, 2026, 3:45 PM",
//     trackingNumber: "TRK-238945601",
//     courier: "Steadfast Courier",
//     shippingAddress: "Mirpur 12, Dhaka, Bangladesh",
//     items: [
//       {
//         id: 4,
//         name: "Mechanical Keyboard",
//         quantity: 1,
//         price: 3500,
//         image:
//           "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
//       },
//     ],
//     subtotal: 3500,
//     shippingFee: 60,
//     total: 3560,
//   },
//   {
//     id: "ORD-2026-004",
//     status: "delayed",
//     customerName: "Sumaia Binta Asad",
//     orderDate: "September 16, 2026",
//     estimatedDelivery: "September 21, 2026",
//     estimatedTime: "10:00 AM - 2:00 PM",
//     trackingNumber: "TRK-567893421",
//     courier: "RedX",
//     shippingAddress: "Mirpur 12, Dhaka, Bangladesh",
//     items: [
//       {
//         id: 5,
//         name: "Laptop Backpack",
//         quantity: 1,
//         price: 1800,
//         image:
//           "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
//       },
//     ],
//     subtotal: 1800,
//     shippingFee: 60,
//     total: 1860,
//   },
// ];

// // --------------------------------------------------
// // DELIVERY STEPS
// // --------------------------------------------------

// const deliverySteps = [
//   {
//     key: "processing",
//     title: "Order Confirmed",
//     description: "Your order has been received.",
//     icon: Package,
//   },
//   {
//     key: "shipped",
//     title: "Shipped",
//     description: "Your package has left the warehouse.",
//     icon: Truck,
//   },
//   {
//     key: "out-for-delivery",
//     title: "Out for Delivery",
//     description: "Your package is on its way to you.",
//     icon: MapPin,
//   },
//   {
//     key: "delivered",
//     title: "Delivered",
//     description: "Your package has been delivered.",
//     icon: CheckCircle2,
//   },
// ];

// // --------------------------------------------------
// // HELPER FUNCTIONS
// // --------------------------------------------------

// function formatCurrency(amount) {
//   return `৳${amount.toLocaleString("en-BD")}`;
// }

// function getStatusLabel(status) {
//   const labels = {
//     processing: "Processing",
//     shipped: "Shipped",
//     "out-for-delivery": "Out for Delivery",
//     delivered: "Delivered",
//     delayed: "Delayed",
//   };

//   return labels[status] || "Unknown";
// }

// function getStatusColor(status) {
//   const colors = {
//     processing: "warning",
//     shipped: "primary",
//     "out-for-delivery": "secondary",
//     delivered: "success",
//     delayed: "danger",
//   };

//   return colors[status] || "default";
// }

// function getCurrentStep(status) {
//   if (status === "delayed") return 1;

//   const steps = {
//     processing: 0,
//     shipped: 1,
//     "out-for-delivery": 2,
//     delivered: 3,
//   };

//   return steps[status] ?? 0;
// }

// // --------------------------------------------------
// // MAIN COMPONENT
// // --------------------------------------------------

// export default function OrderTrackingPage() {
//   const [selectedOrderId, setSelectedOrderId] = useState(orders[0].id);
//   const [expandedDetails, setExpandedDetails] = useState(true);
//   const [issueType, setIssueType] = useState("");
//   const [issueMessage, setIssueMessage] = useState("");
//   const [issueSubmitted, setIssueSubmitted] = useState(false);

//   const {
//     isOpen: isIssueOpen,
//     onOpen: onIssueOpen,
//     onOpenChange: onIssueOpenChange,
//   } = useDisclosure();

//   const {
//     isOpen: isSupportOpen,
//     onOpen: onSupportOpen,
//     onOpenChange: onSupportOpenChange,
//   } = useDisclosure();

//   const selectedOrder =
//     orders.find((order) => order.id === selectedOrderId) || orders[0];

//   const currentStep = getCurrentStep(selectedOrder.status);

//   const isTrackingUnavailable =
//     selectedOrder.status === "processing" &&
//     !selectedOrder.trackingNumber;

//   const isDeliveredButNotReceived =
//     selectedOrder.status === "delivered";

//   const isDelayed = selectedOrder.status === "delayed";

//   function handleOrderChange(event) {
//     setSelectedOrderId(event.target.value);
//     setIssueSubmitted(false);
//   }

//   function handleIssueSubmit(event) {
//     event.preventDefault();

//     if (!issueType || !issueMessage.trim()) {
//       return;
//     }

//     setIssueSubmitted(true);
//   }

//   return (
//     <main className="min-h-screen bg-base-200 px-3 py-6 sm:px-6">
//       <div className="mx-auto w-full max-w-5xl">
//         {/* HEADER */}
//         <header className="mb-6 flex items-center gap-3">
//           <button
//             type="button"
//             className="btn btn-circle btn-ghost btn-sm"
//             aria-label="Go back"
//             onClick={() => window.history.back()}
//           >
//             <ArrowLeft size={20} />
//           </button>

//           <div>
//             <p className="text-sm text-base-content/60">
//               Orders / Tracking
//             </p>

//             <h1 className="text-xl font-bold sm:text-2xl">
//               Track Your Order
//             </h1>
//           </div>
//         </header>

//         {/* ORDER SELECTOR */}
//         <Card className="mb-5 border border-base-300 bg-base-100 shadow-sm">
//           <CardBody className="gap-3 p-4 sm:p-5">
//             <div className="flex items-center justify-between gap-3">
//               <div>
//                 <p className="text-xs text-base-content/60">
//                   Select an order
//                 </p>

//                 <p className="font-semibold">Order tracking</p>
//               </div>

//               <Package className="text-primary" size={24} />
//             </div>

//             <select
//               className="select select-bordered w-full bg-base-100"
//               value={selectedOrderId}
//               onChange={handleOrderChange}
//               aria-label="Select order"
//             >
//               {orders.map((order) => (
//                 <option key={order.id} value={order.id}>
//                   {order.id} - {getStatusLabel(order.status)}
//                 </option>
//               ))}
//             </select>
//           </CardBody>
//         </Card>

//         {/* ORDER OVERVIEW */}
//         <Card className="mb-5 border border-base-300 bg-base-100 shadow-sm">
//           <CardBody className="gap-4 p-4 sm:p-6">
//             <div className="flex flex-wrap items-start justify-between gap-3">
//               <div>
//                 <p className="text-xs text-base-content/60">
//                   Order number
//                 </p>

//                 <h2 className="text-lg font-bold">
//                   {selectedOrder.id}
//                 </h2>
//               </div>

//               <Chip
//                 color={getStatusColor(selectedOrder.status)}
//                 variant="flat"
//                 startContent={
//                   selectedOrder.status === "delayed" ? (
//                     <AlertTriangle size={14} />
//                   ) : undefined
//                 }
//               >
//                 {getStatusLabel(selectedOrder.status)}
//               </Chip>
//             </div>

//             <Divider />

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <div className="flex items-start gap-3">
//                 <CalendarDays
//                   size={20}
//                   className="mt-0.5 shrink-0 text-primary"
//                 />

//                 <div>
//                   <p className="text-xs text-base-content/60">
//                     Estimated delivery
//                   </p>

//                   <p className="text-sm font-semibold">
//                     {selectedOrder.estimatedDelivery}
//                   </p>

//                   <p className="text-xs text-base-content/60">
//                     {selectedOrder.estimatedTime}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <MapPin
//                   size={20}
//                   className="mt-0.5 shrink-0 text-primary"
//                 />

//                 <div>
//                   <p className="text-xs text-base-content/60">
//                     Delivery address
//                   </p>

//                   <p className="text-sm font-semibold">
//                     {selectedOrder.shippingAddress}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </CardBody>
//         </Card>

//         {/* SPECIAL STATUS ALERTS */}
//         {isTrackingUnavailable && (
//           <div
//             role="status"
//             className="mb-5 rounded-2xl border border-warning/30 bg-warning/10 p-4"
//           >
//             <div className="flex items-start gap-3">
//               <Clock3 className="mt-0.5 shrink-0 text-warning" size={22} />

//               <div>
//                 <h3 className="font-bold">Tracking is not available yet</h3>

//                 <p className="mt-1 text-sm text-base-content/70">
//                   Your order has been confirmed, but the courier has not
//                   provided tracking information yet. Please check again
//                   later.
//                 </p>

//                 <p className="mt-2 text-xs font-medium text-base-content/60">
//                   You can contact support if you need additional information.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {isDeliveredButNotReceived && (
//           <div
//             role="alert"
//             className="mb-5 rounded-2xl border border-error/30 bg-error/10 p-4"
//           >
//             <div className="flex items-start gap-3">
//               <CircleX className="mt-0.5 shrink-0 text-error" size={22} />

//               <div>
//                 <h3 className="font-bold">Did not receive your order?</h3>

//                 <p className="mt-1 text-sm text-base-content/70">
//                   Our system shows that this order was delivered. If you
//                   have not received it, please report the issue.
//                 </p>

//                 <button
//                   type="button"
//                   className="btn btn-error btn-outline btn-sm mt-3"
//                   onClick={onIssueOpen}
//                 >
//                   Report missing delivery
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {isDelayed && (
//           <div
//             role="alert"
//             className="mb-5 rounded-2xl border border-error/30 bg-error/10 p-4"
//           >
//             <div className="flex items-start gap-3">
//               <AlertTriangle
//                 className="mt-0.5 shrink-0 text-error"
//                 size={22}
//               />

//               <div>
//                 <h3 className="font-bold">Your order is delayed</h3>

//                 <p className="mt-1 text-sm text-base-content/70">
//                   The estimated delivery date has passed. We are working
//                   to provide an updated delivery estimate.
//                 </p>

//                 <button
//                   type="button"
//                   className="btn btn-error btn-outline btn-sm mt-3"
//                   onClick={onSupportOpen}
//                 >
//                   Contact support
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* DELIVERY TIMELINE */}
//         <Card className="mb-5 border border-base-300 bg-base-100 shadow-sm">
//           <CardBody className="p-4 sm:p-6">
//             <div className="mb-6 flex items-center justify-between gap-3">
//               <div>
//                 <h2 className="text-lg font-bold">
//                   Delivery progress
//                 </h2>

//                 <p className="text-xs text-base-content/60">
//                   Follow your package status
//                 </p>
//               </div>

//               <Truck className="text-primary" size={24} />
//             </div>

//             <div className="space-y-0">
//               {deliverySteps.map((step, index) => {
//                 const Icon = step.icon;

//                 const isCompleted = index <= currentStep;
//                 const isCurrent = index === currentStep;

//                 return (
//                   <div
//                     key={step.key}
//                     className="flex gap-3"
//                   >
//                     {/* TIMELINE ICON AND LINE */}
//                     <div className="flex flex-col items-center">
//                       <div
//                         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
//                           isCompleted
//                             ? "border-primary bg-primary text-primary-content"
//                             : "border-base-300 bg-base-200 text-base-content/40"
//                         }`}
//                       >
//                         <Icon size={18} />
//                       </div>

//                       {index !== deliverySteps.length - 1 && (
//                         <div
//                           className={`my-1 h-12 w-0.5 ${
//                             index < currentStep
//                               ? "bg-primary"
//                               : "bg-base-300"
//                           }`}
//                         />
//                       )}
//                     </div>

//                     {/* STEP INFORMATION */}
//                     <div className="min-w-0 flex-1 pb-6">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <h3
//                           className={`text-sm font-semibold ${
//                             isCurrent
//                               ? "text-primary"
//                               : "text-base-content"
//                           }`}
//                         >
//                           {step.title}
//                         </h3>

//                         {isCurrent && (
//                           <span className="badge badge-primary badge-sm">
//                             Current
//                           </span>
//                         )}
//                       </div>

//                       <p className="mt-1 text-xs text-base-content/60">
//                         {step.description}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {isDelayed && (
//               <div className="mt-2 rounded-xl bg-error/10 p-3">
//                 <p className="text-sm font-medium text-error">
//                   Delivery progress has been delayed.
//                 </p>

//                 <p className="mt-1 text-xs text-base-content/60">
//                   Please contact support for the latest delivery information.
//                 </p>
//               </div>
//             )}

//             {isTrackingUnavailable && (
//               <div className="mt-2 rounded-xl bg-warning/10 p-3">
//                 <p className="text-sm font-medium text-warning">
//                   Tracking details will appear when the courier updates
//                   the shipment.
//                 </p>
//               </div>
//             )}
//           </CardBody>
//         </Card>

//         {/* TRACKING INFORMATION */}
//         <Card className="mb-5 border border-base-300 bg-base-100 shadow-sm">
//           <CardBody className="gap-3 p-4 sm:p-6">
//             <h2 className="text-lg font-bold">Tracking information</h2>

//             <div className="flex items-center justify-between gap-3">
//               <span className="text-sm text-base-content/60">
//                 Tracking number
//               </span>

//               <span className="text-right text-sm font-medium">
//                 {selectedOrder.trackingNumber || "Not available yet"}
//               </span>
//             </div>

//             <Divider />

//             <div className="flex items-center justify-between gap-3">
//               <span className="text-sm text-base-content/60">
//                 Courier
//               </span>

//               <span className="text-right text-sm font-medium">
//                 {selectedOrder.courier || "Not assigned yet"}
//               </span>
//             </div>

//             <Divider />

//             <div className="flex items-center justify-between gap-3">
//               <span className="text-sm text-base-content/60">
//                 Order date
//               </span>

//               <span className="text-right text-sm font-medium">
//                 {selectedOrder.orderDate}
//               </span>
//             </div>

//             {selectedOrder.deliveredAt && (
//               <>
//                 <Divider />

//                 <div className="flex items-center justify-between gap-3">
//                   <span className="text-sm text-base-content/60">
//                     Delivered at
//                   </span>

//                   <span className="text-right text-sm font-medium">
//                     {selectedOrder.deliveredAt}
//                   </span>
//                 </div>
//               </>
//             )}
//           </CardBody>
//         </Card>

//         {/* PRODUCT SUMMARY */}
//         <Card className="mb-5 border border-base-300 bg-base-100 shadow-sm">
//           <CardBody className="p-4 sm:p-6">
//             <button
//               type="button"
//               className="flex w-full items-center justify-between gap-3 text-left"
//               onClick={() => setExpandedDetails((previous) => !previous)}
//               aria-expanded={expandedDetails}
//             >
//               <div>
//                 <h2 className="text-lg font-bold">Order summary</h2>

//                 <p className="text-xs text-base-content/60">
//                   {selectedOrder.items.length} product(s)
//                 </p>
//               </div>

//               {expandedDetails ? (
//                 <ChevronUp size={20} />
//               ) : (
//                 <ChevronDown size={20} />
//               )}
//             </button>

//             {expandedDetails && (
//               <div className="mt-5 space-y-4">
//                 {selectedOrder.items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex gap-3"
//                   >
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="h-20 w-20 shrink-0 rounded-xl object-cover"
//                     />

//                     <div className="min-w-0 flex-1">
//                       <h3 className="text-sm font-semibold">
//                         {item.name}
//                       </h3>

//                       <p className="mt-1 text-xs text-base-content/60">
//                         Quantity: {item.quantity}
//                       </p>

//                       <p className="mt-1 text-sm font-medium">
//                         {formatCurrency(item.price)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}

//                 <Divider />

//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between gap-3">
//                     <span className="text-base-content/60">
//                       Subtotal
//                     </span>

//                     <span>{formatCurrency(selectedOrder.subtotal)}</span>
//                   </div>

//                   <div className="flex justify-between gap-3">
//                     <span className="text-base-content/60">
//                       Shipping fee
//                     </span>

//                     <span>
//                       {formatCurrency(selectedOrder.shippingFee)}
//                     </span>
//                   </div>

//                   <Divider />

//                   <div className="flex justify-between gap-3 text-base font-bold">
//                     <span>Total</span>

//                     <span>{formatCurrency(selectedOrder.total)}</span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </CardBody>
//         </Card>

//         {/* ACTIONS */}
//         <Card className="mb-5 border border-base-300 bg-base-100 shadow-sm">
//           <CardBody className="gap-3 p-4 sm:p-6">
//             <h2 className="text-lg font-bold">Need help?</h2>

//             <p className="text-sm text-base-content/60">
//               Get assistance with your order or report a delivery problem.
//             </p>

//             <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <Button
//                 color="primary"
//                 variant="flat"
//                 startContent={<Headset size={18} />}
//                 onPress={onSupportOpen}
//               >
//                 Contact support
//               </Button>

//               <Button
//                 color="default"
//                 variant="bordered"
//                 startContent={<FileText size={18} />}
//                 onPress={onIssueOpen}
//               >
//                 Report a delivery issue
//               </Button>
//             </div>
//           </CardBody>
//         </Card>

//         {/* FOOTER HELP */}
//         <div className="pb-4 text-center">
//           <p className="text-xs text-base-content/50">
//             Need more assistance?
//           </p>

//           <button
//             type="button"
//             className="mt-1 text-sm font-semibold text-primary underline"
//             onClick={onSupportOpen}
//           >
//             Talk to our support team
//           </button>
//         </div>
//       </div>

//       {/* REPORT ISSUE MODAL */}
//       <Modal
//         isOpen={isIssueOpen}
//         onOpenChange={(open) => {
//           onIssueOpenChange(open);

//           if (!open) {
//             setIssueSubmitted(false);
//           }
//         }}
//         placement="center"
//         scrollBehavior="inside"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Report a delivery issue
//               </ModalHeader>

//               <ModalBody>
//                 {issueSubmitted ? (
//                   <div className="rounded-xl bg-success/10 p-4">
//                     <CheckCircle2
//                       className="mb-2 text-success"
//                       size={28}
//                     />

//                     <h3 className="font-bold">
//                       Issue submitted
//                     </h3>

//                     <p className="mt-1 text-sm text-base-content/60">
//                       Your report has been recorded for this demo.
//                       Our support team would review it in a real application.
//                     </p>
//                   </div>
//                 ) : (
//                   <form
//                     id="delivery-issue-form"
//                     onSubmit={handleIssueSubmit}
//                     className="space-y-4"
//                   >
//                     <div>
//                       <label
//                         htmlFor="issueType"
//                         className="mb-1 block text-sm font-medium"
//                       >
//                         Issue type
//                       </label>

//                       <select
//                         id="issueType"
//                         className="select select-bordered w-full"
//                         value={issueType}
//                         onChange={(event) =>
//                           setIssueType(event.target.value)
//                         }
//                         required
//                       >
//                         <option value="">Select an issue</option>
//                         <option value="not-received">
//                           Delivered but not received
//                         </option>
//                         <option value="delayed">
//                           Order is delayed
//                         </option>
//                         <option value="damaged">
//                           Package is damaged
//                         </option>
//                         <option value="wrong-item">
//                           Wrong item received
//                         </option>
//                         <option value="other">
//                           Other issue
//                         </option>
//                       </select>
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="issueMessage"
//                         className="mb-1 block text-sm font-medium"
//                       >
//                         Describe your issue
//                       </label>

//                       <textarea
//                         id="issueMessage"
//                         className="textarea textarea-bordered min-h-28 w-full"
//                         placeholder="Explain what happened..."
//                         value={issueMessage}
//                         onChange={(event) =>
//                           setIssueMessage(event.target.value)
//                         }
//                         required
//                       />
//                     </div>
//                   </form>
//                 )}
//               </ModalBody>

//               <ModalFooter>
//                 {issueSubmitted ? (
//                   <Button color="primary" onPress={onClose}>
//                     Close
//                   </Button>
//                 ) : (
//                   <>
//                     <Button color="default" variant="light" onPress={onClose}>
//                       Cancel
//                     </Button>

//                     <Button
//                       color="primary"
//                       type="submit"
//                       form="delivery-issue-form"
//                     >
//                       Submit report
//                     </Button>
//                   </>
//                 )}
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>

//       {/* SUPPORT MODAL */}
//       <Modal
//         isOpen={isSupportOpen}
//         onOpenChange={onSupportOpenChange}
//         placement="center"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader>Contact support</ModalHeader>

//               <ModalBody>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <MessageCircle
//                       className="mt-1 text-primary"
//                       size={20}
//                     />

//                     <div>
//                       <h3 className="font-semibold">Live chat</h3>

//                       <p className="text-sm text-base-content/60">
//                         Chat with a support representative.
//                       </p>

//                       <p className="mt-1 text-sm font-medium">
//                         Available: 9 AM - 9 PM
//                       </p>
//                     </div>
//                   </div>

//                   <Divider />

//                   <div className="flex items-start gap-3">
//                     <Phone
//                       className="mt-1 text-primary"
//                       size={20}
//                     />

//                     <div>
//                       <h3 className="font-semibold">Phone support</h3>

//                       <p className="text-sm text-base-content/60">
//                         Call our customer support team.
//                       </p>

//                       <p className="mt-1 text-sm font-medium">
//                         +880 1XXX-XXXXXX
//                       </p>
//                     </div>
//                   </div>

//                   <Divider />

//                   <div className="flex items-start gap-3">
//                     <CircleHelp
//                       className="mt-1 text-primary"
//                       size={20}
//                     />

//                     <div>
//                       <h3 className="font-semibold">Order reference</h3>

//                       <p className="text-sm text-base-content/60">
//                         Share this order number with support.
//                       </p>

//                       <p className="mt-1 text-sm font-medium">
//                         {selectedOrder.id}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </ModalBody>

//               <ModalFooter>
//                 <Button color="primary" onPress={onClose}>
//                   Close
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </main>
//   );
// }