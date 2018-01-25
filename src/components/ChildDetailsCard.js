import { Card, Button, Badge } from 'react-native-elements';
import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import call from 'react-native-phone-call';
import { ErrorMessage } from './ErrorMessage';
//import { displayQuestionAndAnswer } from '../utilities/customQuestionParser';
const Moment = require('moment');


export const ChildDetailsCard = ({ 
        schoolName, 
        schoolYear, 
        healthInformation, 
        customerCreated, 
        fullName, 
        emergencyContacts, 
        addresses, 
        familyDoctors, 
        parentAuthorizedPickups, 
        providerAuthorizedPickups, 
        providerUnauthorizedPickups,
        parentUnauthorizedPickups,
        customQuestions 
    }) => {
    callNumber = (number) => {
        call({
            number: number.replace(/-|\s/g,""),
            prompt: false
        })
    }

    return (
        <Card style={styles.cardWrapper}>
            <View style={styles.infoCard}>
                <Text style={styles.title}>School Information</Text>
                <Text style= {styles.text}>School: {schoolName ? schoolName : 'N/A'}</Text>
                <Text style= {styles.text}>School Year: {schoolYear ? schoolYear : 'N/A'}</Text>
            </View>


            
            {healthInformation ?
                <View style={styles.infoCard}>
                    <Text style={styles.title}>Health Information</Text>
                    <Text style= {styles.boldText}>Allergies: </Text>
                    {
                        healthInformation.has_allergies ? 
                        <View>
                            <Text style={styles.subBoldText}>From Parent:</Text>
                            <Text style={styles.text}>{healthInformation.allergies}</Text>
                        </View>
                        : 
                        <Text style={styles.text}>None</Text>
                    }
                    {
                        healthInformation.provider_allergies ? 
                        <View>
                            <Text style={styles.subBoldText}>From Provider:</Text>
                            <Text style={styles.text}>{healthInformation.provider_allergies}</Text>
                        </View>
                        : 
                        <View>
                            <Text style={styles.subBoldText}>From Provider:</Text>
                            <Text style={styles.text}>None</Text>
                        </View>
                        
                    }
                    <Text style= {styles.boldText}>Bee Allergy Response: </Text>
                    {
                        healthInformation.bee_allergy_response ?
                        <View>
                            <Text style={styles.subBoldText}>From Parent:</Text>
                            <Text style= {styles.text}>{healthInformation.bee_allergy_response}</Text>
                        </View>
                        
                        :
                        <View>
                            <Text style={styles.subBoldText}>From Parent:</Text>
                            <Text style= {styles.text}>None</Text>
                        </View>
                        
                    }
                    {
                        healthInformation.provider_bee_allergy_response ?
                        <View>
                            <Text style={styles.subBoldText}>From Provider:</Text>
                            <Text style= {styles.text}>{healthInformation.provider_bee_allergy_response}</Text>
                        </View>
                        
                        :
                        <View>
                            <Text style={styles.subBoldText}>From Provider:</Text>
                            <Text style= {styles.text}>None</Text>
                        </View>
                        
                    }
                    <Text style= {styles.boldText}>Medical Information: </Text>
                    {
                        healthInformation.medical_info ?
                        <View>
                            <Text style={styles.subBoldText}>From Parent:</Text>
                            <Text style= {styles.text}>{healthInformation.medical_info}</Text>
                        </View>
                        
                        :
                        <View>
                            <Text style={styles.subBoldText}>From Parent:</Text>
                            <Text style= {styles.text}>None</Text>
                        </View>
                        
                    }
                    {
                        healthInformation.provider_medical_info ?
                        <View>
                            <Text style={styles.subBoldText}>From Provider:</Text>
                            <Text style= {styles.text}>{healthInformation.provider_medical_info}</Text>
                        </View>
                        
                        :
                        <View>
                            <Text style={styles.subBoldText}>From Provider:</Text>
                            <Text style= {styles.text}>None</Text>
                        </View>
                        
                    }
                    <Text style= {styles.subBoldText}>Has a condition: {healthInformation.has_conditions ? 'yes' : 'no'}</Text>
                    <Text style= {styles.subBoldText}>Has medication: {healthInformation.has_medication ? 'yes' : 'no'}</Text>
                    {healthInformation.has_medication ? <Text style= {styles.text}>Medication From Parent: {healthInformation.medication}</Text> : false}
                    {healthInformation.provider_medication ? <Text style= {styles.text}>Medication From Provider: {healthInformation.provider_medication}</Text> : false}
                </View>
                :
                <View style={styles.infoCard}> 
                    <Text style= {styles.title}>No Health information was found on {fullName}</Text>
                </View>
            }

            {
                !parentAuthorizedPickups && ! providerAuthorizedPickups  ?
                    <Badge containerStyle={{ backgroundColor: '#ff8e00', marginBottom: 15}}>
                        <Text style={{fontSize: 19, color: '#fff'}}>No authorized pickups found</Text>
                    </Badge>
                :
                    <View>
                        {parentAuthorizedPickups ?
                            <View style={styles.infoCard}> 
                            <Text style={styles.title}>Parent Authorized Pickups</Text>
                            {parentAuthorizedPickups.map(({first_name, last_name, phone, active}, index) => (
                                active ? 
                                    <View key={index}>
                                        {(first_name && last_name) ? <Text style={{fontSize: 20, alignSelf: 'center', marginTop: 50, marginBottom: 10}}>{first_name} {last_name}</Text> : false} 
                                        {phone ?
                                            <Button
                                                small
                                                backgroundColor='#74CC82'
                                                title={ phone }
                                                iconRight={{name: 'phone', type: 'Entypo'}}
                                                onPress={() => callNumber(phone)}
                                            />
                                            :
                                            <Button
                                                small
                                                backgroundColor='#E5644E'
                                                title={ 'No Number Found' }
                                                onPress={false}
                                            />
                                        }
                                    </View>
                                    : 
                                    false
                            ))}
                            </View>
                            :
                            <View style={styles.infoCard}>
                                <Text style={styles.title}>No parent authorized pickups found</Text>
                            </View>
                        }
            
                        {providerAuthorizedPickups ?
                            <View style={styles.infoCard}> 
                            <Text style={styles.title}>Provider Authorized Pickups</Text>
                                <View>
                                    {
                                        (providerAuthorizedPickups.authorized_pickups) ? 
                                        <Text style={styles.text}>{providerAuthorizedPickups.authorized_pickups}</Text> 
                                        : 
                                        <Text style={styles.text}>No provider authorized Pickups found</Text>
                                    } 
                                </View>
                            </View>
                            :
                            <View style={styles.infoCard}>
                                <Text style={styles.title}>No provider authorized pickups found</Text>
                            </View>
                        }
                    </View>

            }
            {
                !parentUnauthorizedPickups && !providerUnauthorizedPickups ?
                    <Badge containerStyle={{ backgroundColor: '#ff8e00', marginBottom: 15}}>
                        <Text style={{fontSize: 19, color: '#fff'}}>No unauthorized pickups found</Text>
                    </Badge>   
                :
                    <View>
                    {parentUnauthorizedPickups ?
                        <View style={styles.infoCard}>
                            <Text style={styles.title}>Parent Unauthorized pickups</Text>
                            <Text style={styles.text}>{parentUnauthorizedPickups}</Text>
                        </View>
                    :
                        <View style={styles.infoCard}>
                            <Text style={styles.title}>No parent unauthorized pickups found</Text>
                        </View>
                    }
        
                    {providerUnauthorizedPickups ?
                        <View style={styles.infoCard}>
                            <Text style={styles.title}>Provider Unauthorized pickups</Text>
                            <Text style={styles.text}>{providerUnauthorizedPickups}</Text>
                        </View>
                    :
                        <View style={styles.infoCard}>
                            <Text style={styles.title}>No provider unauthorized pickups found</Text>
                        </View>
                    }
                    </View>
            }

            {Object.keys(familyDoctors).length > 0 ?
                <View style={styles.infoCard}>
                    <Text style={styles.title}>Family Doctors</Text>
                    {Object.keys(familyDoctors).map((d) => (
                        <View key={familyDoctors[d]}>
                            <Text style={styles.text}>{familyDoctors[d].medical_clinic}</Text>
                            <Text style={styles.text}>Doctor: {familyDoctors[d].name}</Text>
                            <Button
                                small
                                backgroundColor='#4CAF50'
                                title={ familyDoctors[d].phone }
                                iconRight={{name: 'phone', type: 'Entypo'}}
                                onPress={() => callNumber(familyDoctors[d].phone)}
                            />
                        </View>
                    ))}
                    
                </View>
                :
                false
            }
            
            
            <Text style= {styles.text}>Last Modified: {Moment(healthInformation.modified).format("DD of MMMM, YYYY")}</Text>
            <Text style= {styles.text}>Acount Created: {Moment(customerCreated).format("MMMM D, YYYY, h:mm:ss a")}</Text>
        </Card>
    );
};


//custom questions WIP
// {customQuestions && customQuestions.length > 0 ?
//     <View  style={styles.infoCard}>
//     {customQuestions.map((obj, index) => {
//         const displayObject = displayQuestionAndAnswer(obj);

//         if(displayObject !== null) {
//             return (
//                 <View key={index}>
//                     <Text>{displayObject.question} ?</Text>
//                     <Text>{displayObject.answer}</Text>
//                 </View>
//             );
//         }   
//         return false;
//     })}
//     </View>
//     :
//     false
// }

const styles = StyleSheet.create({
    cardWrapper: {
        marginBottom: 100
    },
    infoCard: {
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#E3F2FD',
        marginBottom: 15
    },
    title: {
        paddingLeft: 20,
        fontSize: 22,
        marginBottom: 10,
        color: '#2a2a2a'
    },
    text: {
        paddingLeft: 20,
        fontSize: 18,
        marginBottom: 15
    },
    subBoldText: {
        paddingLeft: 20,
        fontSize: 18,
        color: '#2A2A2A'
    },
    boldText:{
        paddingLeft: 20,
        fontSize: 22,
        marginBottom: 15,
        color: 'black'
    },
    emergencyContactName: {
        alignSelf:'center',
        fontSize: 18,
        marginBottom: 15
    },
    subText: {
        alignSelf: 'center',
        fontSize: 15,
        marginBottom: 15
    }
});