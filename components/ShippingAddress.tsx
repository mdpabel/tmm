import Button from '@/components/Button';
import Input, { InputWrapper, Label, TextArea } from '@/components/Input';
import AppLayout from '@/layouts/AppLayout';
import React, { useEffect, useState, SyntheticEvent } from 'react';
import { useRouter } from 'next/router';

const initialState = {
  startAddress: '',
  endAddress: '',
  place: '',
  state: '',
  city: '',
  zip: '',
  loading: true,
  unloading: true,
  numberOfRooms: '',
  numberOfStairFlights: '',
  numberOfStairFloors: '',
  numberOfStairDimensions: '',
  specialItems: '',
  notes: '',
  latitude: '',
  longitude: '',
};

const ShippingAddress = ({ next }: { next: () => void }) => {
  const router = useRouter();
  // const { data: session, status } = useSession();
  const [orderDetailsState, setOrderDetailsState] = useState({
    ...initialState,
  });

  // useEffect(() => {
  //   if (status !== 'loading' && !session) {
  //     router.push('/login?returnUrl=/order-details');
  //   }
  // }, [router, session, status]);

  const {
    startAddress,
    city,
    place,
    state,
    endAddress,
    numberOfStairFlights,
    numberOfRooms,
    loading,
    unloading,
    zip,
    longitude,
    latitude,
    notes,
    specialItems,
    numberOfStairDimensions,
    numberOfStairFloors,
  } = orderDetailsState;

  useEffect(() => {
    setOrderDetailsState(
      JSON.parse(
        window.localStorage.getItem('orderDetails') ??
          JSON.stringify(initialState)
      )
    );
  }, []);

  const handleForm = (e: SyntheticEvent) => {
    e.preventDefault();
    window.localStorage.setItem(
      'orderDetails',
      JSON.stringify(orderDetailsState)
    );
    next();
  };

  return (
    <div>
      <h2 className='py-2 text-xl font-semibold'>Order details</h2>
      <hr className='py-4' />
      <form
        onSubmit={handleForm}
        className='w-full max-w-sm space-y-6 md:max-w-3xl'
      >
        <InputWrapper>
          <Label htmlFor='start-add'>Start Address</Label>
          <Input
            minLength={5}
            maxLength={100}
            placeholder='From'
            id='start-add'
            focus={true}
            onChange={(e) =>
              setOrderDetailsState({
                ...orderDetailsState,
                startAddress: e.target.value,
              })
            }
            value={startAddress}
            required={true}
            type='text'
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='end-add'>End Address</Label>
          <Input
            minLength={5}
            maxLength={100}
            placeholder='To'
            id='end-add'
            focus={true}
            onChange={(e) =>
              setOrderDetailsState({
                ...orderDetailsState,
                endAddress: e.target.value,
              })
            }
            value={endAddress}
            required={true}
            type='text'
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='state'>State</Label>
          <Input
            minLength={3}
            maxLength={50}
            placeholder='State'
            id='state'
            focus={true}
            onChange={(e) =>
              setOrderDetailsState({
                ...orderDetailsState,
                state: e.target.value,
              })
            }
            value={state}
            required={true}
            type='text'
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='city'>city</Label>
          <Input
            minLength={3}
            maxLength={50}
            placeholder='city'
            id='city'
            focus={true}
            onChange={(e) =>
              setOrderDetailsState({
                ...orderDetailsState,
                city: e.target.value,
              })
            }
            value={city}
            required={true}
            type='text'
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='zip'>zip</Label>
          <Input
            placeholder='Zip'
            id='zip'
            focus={true}
            onChange={(e) =>
              setOrderDetailsState({
                ...orderDetailsState,
                zip: e.target.value,
              })
            }
            value={zip}
            required={true}
            type='number'
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='Place'>Place</Label>
          <Input
            minLength={3}
            maxLength={100}
            placeholder='House, Apartment, Office or Business...'
            id='Place'
            focus={true}
            onChange={(e) =>
              setOrderDetailsState({
                ...orderDetailsState,
                place: e.target.value,
              })
            }
            value={place}
            required={true}
            type='text'
          />
        </InputWrapper>

        <div>
          <label className='relative inline-flex items-center mr-5 cursor-pointer'>
            <input
              type='checkbox'
              value=''
              className='sr-only peer'
              checked={loading}
              onChange={(e) =>
                setOrderDetailsState({
                  ...orderDetailsState,
                  loading: e.target.checked,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-800 rounded-full peer  peer-focus:ring-4 peer-focus:ring-indigo-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 '>
              Loading
            </span>
          </label>

          <label className='relative inline-flex items-center mr-5 cursor-pointer'>
            <input
              type='checkbox'
              value=''
              className='sr-only peer'
              checked={unloading}
              onChange={(e) =>
                setOrderDetailsState({
                  ...orderDetailsState,
                  unloading: e.target.checked,
                })
              }
            />
            <div className="w-11 h-6 bg-gray-800 rounded-full peer  peer-focus:ring-4 peer-focus:ring-indigo-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-indigo-600"></div>
            <span className='ml-3 text-sm font-medium text-gray-900 '>
              Unloading
            </span>
          </label>
        </div>

        <div className='flex flex-col items-center w-full gap-4 md:justify-between md:flex-row'>
          <InputWrapper>
            <Label htmlFor='rooms'>Number of Rooms</Label>
            <Input
              min={1}
              max={50}
              placeholder='Number of Rooms'
              id='rooms'
              focus={true}
              onChange={(e) =>
                setOrderDetailsState({
                  ...orderDetailsState,
                  numberOfRooms: e.target.value,
                })
              }
              value={numberOfRooms}
              required={true}
              type='number'
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor='flights'>Number of Stair Flights</Label>
            <Input
              min={1}
              max={50}
              placeholder='Number of Stair Flights'
              id='flights'
              focus={true}
              onChange={(e) =>
                setOrderDetailsState({
                  ...orderDetailsState,
                  numberOfStairFlights: e.target.value,
                })
              }
              value={numberOfStairFlights}
              required={true}
              type='number'
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor='floors'>Number of Floors</Label>
            <Input
              placeholder='Number of Floors'
              id='floors'
              focus={true}
              onChange={(e) =>
                setOrderDetailsState({
                  ...orderDetailsState,
                  numberOfStairFloors: e.target.value,
                })
              }
              value={numberOfStairFloors}
              required={true}
              type='number'
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor='dimensions'>Foot Dimensions</Label>
            <Input
              placeholder='Foot Dimensions'
              id='dimensions'
              focus={true}
              onChange={(e) =>
                setOrderDetailsState({
                  ...orderDetailsState,
                  numberOfStairDimensions: e.target.value,
                })
              }
              value={numberOfStairDimensions}
              required={true}
              type='number'
            />
          </InputWrapper>
        </div>

        <InputWrapper>
          <Label htmlFor='items'>Special Items</Label>
          <TextArea
            placeholder='items'
            onChange={(e) =>
              setOrderDetailsState({
                ...orderDetailsState,
                specialItems: e.target.value,
              })
            }
            value={specialItems}
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='notes'>Notes</Label>
          <TextArea
            placeholder='notes'
            onChange={(e) =>
              setOrderDetailsState({
                ...orderDetailsState,
                notes: e.target.value,
              })
            }
            value={notes}
          />
        </InputWrapper>

        <Button type='submit'>Submit details</Button>
      </form>
    </div>
  );
};

export default ShippingAddress;
