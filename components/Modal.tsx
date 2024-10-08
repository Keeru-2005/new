// "use client"

// import { Fragment, useState } from 'react';
// import { Description, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
// import React from 'react'

// const Modal = () => {
//     let[isOpen ,setIsOpen] = useState(true)

//     const openModal= () => setIsOpen(true);
//     const closeModal =() => setIsOpen(false);

//   return (
//     <>
//     <button type='button' className='btn' onClick={openModal}>
//         Track
//     </button>

//     <Transition appear show={isOpen} as={Fragment} >

//     <Dialog as="div" onClose={closeModal} className="relative z-50 dialog-container">
//         <div className="min-h-screen px-4 text-center">
//           <TransitionChild
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom='opacity-100'
//           leaveTo="opacity-0"
//           >
//              {/* <Dialog.Overlay className="fixed inset-0"/> */}
//              <div className="fixed inset-0 bg-black bg-opacity-25" />
                    

//           </TransitionChild>

//         <TransitionChild
//         as={Fragment}
//         enter="ease-out duration-300"
//         enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="ease-in duration-200"
//           leaveFrom='opacity-100 scale-100'
//           leaveTo="opacity-0 scale-95"

//         >

//         <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//             <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
//                 Modal Title
//             </DialogTitle>
//             <div className="mt-2">
//                 <p className="text-sm text-gray-500">
//                     Your modal content goes here.
//                 </p>
//             </div>

//             <div className="mt-4">
//                 <button
//                     type="button"
//                     className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                     onClick={closeModal}
//                 >
//                     Close
//                 </button>
//             </div>
//         </DialogPanel>

//         </TransitionChild>

//         </div>
//       </Dialog>

//     </Transition> 

    
//     </>
//   )
// }

// export default Modal;


"use client"

import { FormEvent, Fragment, useState } from 'react'
import { Dialog, Transition, TransitionChild } from '@headlessui/react'
import Image from 'next/image'
import React from 'react'
import { addUserEmailToProduct } from '@/lib/actions'

interface Props {
  productId: string
}

const Modal = ({ productId }: Props) => {
  let [isOpen, setIsOpen] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await addUserEmailToProduct(productId, email);

    setIsSubmitting(false)
    setEmail('')
    closeModal()
  }

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Track
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal} className="dialog-container relative z-10">
          <div className="min-h-screen px-4 text-center">
            <TransitionChild
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* <Dialog.Overlay className="fixed inset-0" />  */}
            </TransitionChild>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            />
            
            <TransitionChild
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className="p-3 border border-gray-200 rounded-10">
                      <Image 
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={28}
                        height={28}
                      />
                    </div>

                    <Image 
                      src="/assets/icons/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={closeModal}
                    />
                  </div>

                  <h4 className="dialog-head_text">
                    Stay updated with product pricing alerts right in your inbox!
                  </h4>

                  <p className="text-sm text-gray-600 mt-2">
                    Never miss a bargain again with our timely alerts!
                  </p>
                </div>

                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="dialog-input_container">
                    <Image 
                      src="/assets/icons/mail.svg"
                      alt='mail'
                      width={18}
                      height={18}
                    />

                    <input 
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className='dialog-input'
                    />
                  </div>

                  <button type="submit"
                    className="dialog-btn"
                  >
                    {isSubmitting ? 'Submitting...' : 'Track'}
                  </button>
                </form>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal;