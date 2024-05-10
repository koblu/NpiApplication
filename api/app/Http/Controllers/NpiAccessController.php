<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\DTOs\DataPieceDTO;

class NpiAccessController extends Controller
{
    // public function grabTest() {
    //     $searchObj = new NpiSearchObject();

    //     $searchObj->city = "Knoxville";

    //     $grab($searchObj, 0);

    // }

    public function grabResults(Request $request) 
    {

        \Log::info($this->generateQueryString($request));

        $url = 'https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=50' . $this->generateQueryString($request);

        $response = Http::get($url)->object();

        if(isset($response->Errors)) return $response;
        
        $results = $response->results;

        $curated = array_map(array($this, 'mapDataPiece'), $results);

        return $curated;
    }

    public function grabDetails(string $id) 
    {


        $url = 'https://npiregistry.cms.hhs.gov/api/?version=2.1&number=' . $id;

        $response = Http::get($url);

        return $response->object()->results[0];
    }


    protected function generateQueryString(Request $request): string 
    {
        $npiNo = $request->json("npiNo");
        $firstName = $request->json("firstName");
        $lastName = $request->json("lastName");
        $taxoDesc = $request->json("taxoDesc");
        $city = $request->json("city");
        $state = $request->json("state");
        $zip = $request->json("zip");
        $skip = $request->json("skip");

        return (empty($npiNo) ? "" : "&number=".$npiNo)
        . (empty($firstName) ? "" : "&first_name=".$firstName)
        . (empty($lastName) ? "" : "&last_name=".$lastName)
        . (empty($taxoDesc) ? "" : "&taxonomy_description=".$taxoDesc)
        . (empty($city) ? "" : "&city=".$city)
        . (empty($state) ? "" : "&state=".$state)
        . (empty($zip) ? "" : "&postal_code=".$zip)
        . (empty($skip) ? "" : "&skip=".$skip);


    }

    protected function mapDataPiece(object $data): object {
        $basicInfo = $data->basic;
        $mailingAddr = array_column($data->addresses, null, "address_purpose")["MAILING"];
        $filtered = new DataPieceDTO();

         $filtered->name = isset($basicInfo->organization_name) ? $basicInfo->organization_name : $basicInfo->first_name . ' ' . $basicInfo->last_name;
         $filtered->address_1 = isset($mailingAddr->address_1) ? $mailingAddr->address_1 : 'No Mailing Address';
         $filtered->address_2 = isset($mailingAddr->address_2) && isset($filtered->address_1) ? $mailingAddr->address_2 : null;
         $filtered->city = isset($mailingAddr->city) ? $mailingAddr->city : '';
         $filtered->state = isset($mailingAddr->state) ? $mailingAddr->state : '';
         $filtered->zip = isset($mailingAddr->postal_code) ? $mailingAddr->postal_code : '';
         $filtered->npiNo = $data->number;

         return (object) $filtered;

    }
}
