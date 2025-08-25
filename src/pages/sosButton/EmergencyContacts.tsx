// src/pages/settings/EmergencyContacts.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Phone, User } from 'lucide-react';

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [newContact, setNewContact] = useState<EmergencyContact>({
    name: '',
    phone: '',
    relationship: ''
  });

  useEffect(() => {
    // Load saved contacts
    const savedContacts = localStorage.getItem('emergencyContacts');
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (e) {
        console.error('Error parsing contacts:', e);
      }
    }
  }, []);

  const saveContacts = (updatedContacts: EmergencyContact[]) => {
    setContacts(updatedContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
  };

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const updatedContacts = [...contacts, newContact];
      saveContacts(updatedContacts);
      setNewContact({ name: '', phone: '', relationship: '' });
    }
  };

  const removeContact = (index: number) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    saveContacts(updatedContacts);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Emergency Contacts</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Emergency Contact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              className="w-full p-2 border rounded-md"
              placeholder="Contact name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={newContact.phone}
              onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              className="w-full p-2 border rounded-md"
              placeholder="Phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Relationship</label>
            <input
              type="text"
              value={newContact.relationship}
              onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
              className="w-full p-2 border rounded-md"
              placeholder="Friend, Family, etc."
            />
          </div>
        </div>
        
        <button
          onClick={addContact}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>Add Contact</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Your Emergency Contacts</h2>
        
        {contacts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No emergency contacts added yet.</p>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Phone size={14} />
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => removeContact(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  title="Remove contact"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyContacts;