
export const GqlConstants = {
  SEARCH_USER: `query SignIn($email:String, $password:String) {
    user(where: {_and: {email: {_eq: $email}, password: {_eq: $password}}, type: {_eq: provider}}) {
      firstName
      lastName
      password
      email
    }
  }`,
  
  GET_ALL_PATIENTS: `query PatientList($conditions: [String!]) {
    patient_aggregate(where: {medicalConditions: {_has_keys_any: $conditions}}) {
      aggregate {
        count
      }
    }
    patient(limit: 10, offset: 0, where: {medicalConditions: {_has_keys_any: $conditions}}) {
      createdAt
      id
      identifier
      medicalConditions
      preferredGenres
      sessions(order_by: {createdAt: desc}, limit: 1, offset: 0) {
        createdAt
      }
      sessions_aggregate {
        aggregate {
          count
        }
      }
      primaryTherapistUser {
        firstName
        lastName
      }
    }
  }`,
  
  GET_CAREPLANS: `query GetCarePlans {
    careplan {
      createdAt
      careplan_activities_aggregate {
        aggregate {
          count
        }
      }
      user_careplans_aggregate {
        aggregate {
          count
        }
      }
      name
      createdBy
      id
      tags
    }
  }`,
  
  INSERT_PATIENT: `mutation InsertPatient($identifier:String, $medicalConditions:jsonb, $preferredGenres:jsonb) {
    insert_patient_one(object: {identifier: $identifier, medicalConditions: $medicalConditions, preferredGenres: $preferredGenres}) {
      id
    }
  }`,
  
  GET_PATIENT_DETAILS: `query GetUserDetails($user:uuid!) {
    user_by_pk(id: $user) {
      createdAt
      firstName
      id
      lastActive
      lastName
      sessions {
        id
        createdAt
        endedAt
      }
      status
      sessions_aggregate {
        aggregate {
          count
        }
      }
      subscriptions {
        expiry
      }
      user_profile {
        dob
        gender
        medicalConditions
        onboardedOn
        otherConditions
        phone
        preferredGenre
      }
      userRelationsByTo {
        userFrom {
          firstName
          lastName
          lastActive
          status
          email
          user_profile {
            createdAt
            dob
            gender
            onboardedOn
            phone
          }
        }
      }}}`
      
      
    } as const
    