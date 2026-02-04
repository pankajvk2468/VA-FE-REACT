import React from 'react';

const placeholder = (title: string) => () => (
  <div className="fade-in">
    <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
    <div className="card">
      <p className="text-gray-600">
        This page is under development. Full functionality will be implemented soon.
      </p>
    </div>
  </div>
);

export const UsersList = placeholder('Users Management');
export const UserDetails = placeholder('User Details');
export const UserEdit = placeholder('Edit User');
export const CompaniesList = placeholder('Companies');
export const CompanyEdit = placeholder('Edit Company');
export const ProfessionalsList = placeholder('Professionals');
export const ProfessionalEdit = placeholder('Edit Professional');
export const AdministratorsList = placeholder('Administrators');
export const StaffMessages = placeholder('Staff Messages');
