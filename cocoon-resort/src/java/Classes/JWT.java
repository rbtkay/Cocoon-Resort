/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Classes;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import io.jsonwebtoken.*;
import java.util.Date;

/**
 *
 * @author Robert
 */
public class JWT {

    //Sample method to construct a JWT
    public String createJWT(int id, String email, String type) {
        

        //The JWT signature algorithm we will be using to sign the token
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

//        long nowMillis = System.currentTimeMillis();
//        Date now = new Date(nowMillis);
        //We will sign our JWT with our ApiKey secret
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary("secret");
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        //Let's set the JWT Claims
        JwtBuilder builder = Jwts.builder()
                .setId(String.valueOf(id))
                .setSubject(email)
                .setIssuer(type)
                .signWith(signatureAlgorithm, signingKey);

        //if it has been specified, let's add the expiration
//        if (ttlMillis >= 0) {
//            long expMillis = nowMillis + ttlMillis;
//            Date exp = new Date(expMillis);
//            builder.setExpiration(exp);
//        }
        //Builds the JWT and serializes it to a compact, URL-safe string
        return builder.compact();
    }

    //Sample method to validate and read the JWT
    public boolean parseJWT(String jwt, String id) {
        System.out.print("Hello");
        //This line will throw an exception if it is not a signed JWS (as expected)
        try {

            System.out.print("in the class");

            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary("secret"))
                    .parseClaimsJws(jwt).getBody();

            System.out.print(id);
            if (!id.isEmpty()) {
                if (!id.equals(claims.getId())) {
                    return false;
                }
            }
//            System.out.println("ID: " + claims.getId());
//            System.out.println("Subject: " + claims.getSubject());
//            System.out.println("Issuer: " + claims.getIssuer());
//            System.out.println("Expiration: " + claims.getExpiration());

            return true;
        } catch (Exception e) {
            return false;
        }

//        return false;
    }
}
