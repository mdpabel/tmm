import Button from '@/components/Button';
import Input, { InputWrapper, Label, TextArea } from '@/components/Input';
import AppLayout from '@/layouts/AppLayout';
import React, { useState } from 'react';

const initialState = {
  startAdd: '',
  endAdd: '',
  place: '',
  loading: true,
  rooms: '',
  flights: '',
  dimensions: '',
  floors: '',
  unLoading: true,
  notes: '',
  specialItems: '',
};

const OrderDetails = () => {
  const [state, setState] = useState({ ...initialState });

  const {
    startAdd,
    endAdd,
    place,
    flights,
    rooms,
    loading,
    unLoading,
    floors,
    dimensions,
    specialItems,
    notes,
  } = state;

  return (
    <div>
      <h2 className='py-2 text-xl font-semibold'>Order details</h2>
      <hr className='py-4' />
      <form className='w-full max-w-sm space-y-6 md:max-w-3xl'>
        <InputWrapper>
          <Label htmlFor='start-add'>Start Address</Label>
          <Input
            placeholder='From'
            id='start-add'
            focus={true}
            onChange={(e) => setState({ ...state, startAdd: e.target.value })}
            value={startAdd}
            required={true}
            type='text'
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='end-add'>Start Address</Label>
          <Input
            placeholder='To'
            id='end-add'
            focus={true}
            onChange={(e) => setState({ ...state, endAdd: e.target.value })}
            value={endAdd}
            required={true}
            type='text'
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='Place'>Place</Label>
          <Input
            placeholder='House, Apartment, Office or Business...'
            id='Place'
            focus={true}
            onChange={(e) => setState({ ...state, place: e.target.value })}
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
                setState({ ...state, loading: e.target.checked })
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
              checked={unLoading}
              onChange={(e) =>
                setState({ ...state, unLoading: e.target.checked })
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
              placeholder='Number of Rooms'
              id='rooms'
              focus={true}
              onChange={(e) => setState({ ...state, rooms: e.target.value })}
              value={rooms}
              required={true}
              type='number'
            />
          </InputWrapper>

          <InputWrapper>
            <Label htmlFor='flights'>Number of Stair Flights</Label>
            <Input
              placeholder='Number of Stair Flights'
              id='flights'
              focus={true}
              onChange={(e) => setState({ ...state, flights: e.target.value })}
              value={flights}
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
              onChange={(e) => setState({ ...state, floors: e.target.value })}
              value={floors}
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
                setState({ ...state, dimensions: e.target.value })
              }
              value={dimensions}
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
              setState({ ...state, specialItems: e.target.value })
            }
            value={specialItems}
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor='notes'>Notes</Label>
          <TextArea
            placeholder='notes'
            onChange={(e) => setState({ ...state, notes: e.target.value })}
            value={notes}
          />
        </InputWrapper>

        <Button type='submit'>Submit details</Button>
      </form>
    </div>
  );
};

OrderDetails.layout = AppLayout;

export default OrderDetails;
