import { useState } from 'react';
import Location from './Location';

export default function AccessibleDataForm() {
  // State to keep track of the form values
  const [formData, setFormData] = useState({
    doorType: '',
    doorKnob: '',
    ramps: false,
    stairs: false,
  });

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the form data, e.g. send it to a server
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-4 pt-4">
      {/* Door Type */}
      <div>
        <label htmlFor="doorType" className="block mb-1 text-sm font-semibold">
          Door Type
        </label>
        <select
          id="doorType"
          name="doorType"
          value={formData.doorType}
          onChange={handleChange}
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Door Type</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="automatic">Automatic</option>
          <option value="revolving">Revolving</option>
          <option value="open">Open</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Door Knob */}
      <div>
        <label htmlFor="doorKnob" className="block mb-1 text-sm font-semibold">
          Door Knob
        </label>
        <select
          id="doorKnob"
          name="doorKnob"
          value={formData.doorKnob}
          onChange={handleChange}
          className="w-full p-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Door Knob</option>
          <option value="verticalBar">Vertical Bar</option>
          <option value="pull">Pull</option>
          <option value="round">Round</option>
          <option value="horizontalBar">Horizontal Bar</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* Ramps */}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="ramps"
            checked={formData.ramps}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm">Are there ramps?</span>
        </label>
      </div>

      {/* Stairs */}
      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="stairs"
            checked={formData.stairs}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm">Are there stairs?</span>
        </label>
      </div>

      <Location />

      {/* Submit Button */}
      <div className="flex flex-col items-center space-y-4 pt-4">
        <button className="px-8 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};
